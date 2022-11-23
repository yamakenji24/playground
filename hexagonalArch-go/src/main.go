package main

import (
	"github.com/gin-gonic/gin"
	"github.com/yamakenji24/hexagonalArch-go/src/Presentation/Controller"
	"github.com/yamakenji24/hexagonalArch-go/src/Presentation/Middleware"
)

func main() {
	g := gin.Default()

	sqlHandler := Middleware.NewSqlHandler()
	todoController := Controller.NewTodoController(sqlHandler)

	g.GET("/test", Controller.TestController)
	g.GET("/todos", todoController.GetTodosByID)

	g.Run(":8080")
}
