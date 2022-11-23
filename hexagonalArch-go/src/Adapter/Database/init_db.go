package Database

import (
	"fmt"
	mysqldriver "github.com/go-sql-driver/mysql"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"os"
	"time"
)

var dsn string

func init() {
	user := getEnv("DB_USER", "hogehoge")
	passwd := getEnv("DB_PASS", "pass")
	dbName := getEnv("DB_NAME", "todo_app")
	addr := getEnv("DB_ADDR", "mysql")

	dbConfig := mysqldriver.Config{
		User:      user,
		Passwd:    passwd,
		Net:       "tcp",
		Addr:      addr,
		DBName:    dbName,
		ParseTime: true,
	}
	dsn = dbConfig.FormatDSN()
}

func MysqlMigrate() SqlHandler {
	db := connection(dsn, 30)
	db.Set("gorm:table_options", "ENGINE=InnoDB")

	if err := db.AutoMigrate(&Todo{}); err != nil {
		fmt.Println(err)
	}

	createSampleData(db)

	return db
}

func connection(path string, count uint) *gorm.DB {
	db, err := gorm.Open(mysql.New(mysql.Config{
		DSN:                       path,
		SkipInitializeWithVersion: true,
	}), &gorm.Config{})
	if err != nil {
		if count == 0 {
			panic(err)
		}
		time.Sleep(time.Second)
		count--
		return connection(path, count)
	}

	return db
}

func createSampleData(db *gorm.DB) {
	sampleTodo := Todo{
		AccountID: "1",
		Title:     "sampleTodo",
	}
	if err := db.Create(&sampleTodo).Error; err != nil {
		fmt.Println(err)
	}
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
