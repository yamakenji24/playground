package Controller

import (
	"github.com/gin-gonic/gin"
	"github.com/yamakenji24/hexagonalArch-go/src/Adapter/Database"
	"github.com/yamakenji24/hexagonalArch-go/src/Application/UseCase"
	"net/http"
)

type TodoController struct {
	Interactor UseCase.TodoInteractor
}

func NewTodoController(sqlHandler Database.SqlHandler) *TodoController {
	return &TodoController{
		Interactor: UseCase.TodoInteractor{
			TodoRepository: &Database.TodoRepository{
				SqlHandler: sqlHandler,
			},
		},
	}
}

func (controller *TodoController) GetTodosByID(c *gin.Context) {
	todo, err := controller.Interactor.TodoByID(1)

	if err != nil {
		c.JSON(http.StatusBadRequest, "bad request")
		return
	}
	
	c.JSON(http.StatusOK, todo)
}
