package facade

import (
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

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

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
