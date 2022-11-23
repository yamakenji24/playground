package Database

import Domain "github.com/yamakenji24/hexagonalArch-go/src/Domain/Todo"

type TodoRepository struct {
	SqlHandler
}

func (repo *TodoRepository) FindByID(id uint) (Domain.Todo, error) {
	var todo Todo
	if result := repo.Where("id = ?", id).First(&todo); result.Error != nil {
		err := result.Error
		return Domain.Todo{}, err
	}
	return Domain.Todo{
		ID:        todo.ID,
		AccountID: todo.AccountID,
		Title:     todo.Title,
	}, nil
}
