package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowHeaders: []string{"Authorization", "Content-Type"},
		AllowMethods: []string{"POST", "GET", "OPTIONS"},
	}))
	router.SetTrustedProxies(nil)

	router.GET("/", func(c *gin.Context) {
		c.String(200, "Hello,World!")
	})

	router.Run(":10080")
}
