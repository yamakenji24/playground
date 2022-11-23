package Database

import "gorm.io/gorm"

type SqlHandler interface {
	Create(interface{}) *gorm.DB
	Save(interface{}) *gorm.DB
	Where(interface{}, ...interface{}) *gorm.DB
	First(interface{}, ...interface{}) *gorm.DB
}

type Todo struct {
	gorm.Model
	AccountID string `gorm:"size:32;" json:"account_id"`
	Title     string `gorm:"size:255;" json:"title"`
}
