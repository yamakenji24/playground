package Domain

type Todo struct {
	ID        uint   `json:"id"`
	AccountID string `json:"account_id"`
	Title     string `json:"title"`
}
