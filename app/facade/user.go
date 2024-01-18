package facade

type UserItem struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type UserStoreInterface interface {
	GetUser() ([]UserItem, error)
}
