package Domain

type TodoRepository interface {
	FindByID(uint) (Todo, error)
}
