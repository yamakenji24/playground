package Middleware

import (
	"github.com/yamakenji24/hexagonalArch-go/src/Adapter/Database"
)

func NewSqlHandler() Database.SqlHandler {
	db := Database.MysqlMigrate()
	return db
}
