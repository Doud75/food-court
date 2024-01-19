package facade

import "github.com/google/uuid"

type UserItem struct {
	ID       uuid.NullUUID `json:"id"`
	Email    string        `json:"email"`
	Password string        `json:"password"`
	Role     string        `json:"role"`
}

type UserStoreInterface interface {
	GetUser() ([]UserItem, error)
	GetUserByMail(string) (UserItem, error)
}
