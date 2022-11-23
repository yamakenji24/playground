package UseCase

import (
	Domain "github.com/yamakenji24/hexagonalArch-go/src/Domain/Todo"
)

type TodoInteractor struct {
	TodoRepository Domain.TodoRepository
}

func (interactor *TodoInteractor) TodoByID(id uint) (todo Domain.Todo, err error) {
	todo, err = interactor.TodoRepository.FindByID(id)
	return
}
