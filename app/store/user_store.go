package store

import (
	"database/sql"
	"food_court/facade"
)

func NewUserStore(db *sql.DB) *UserStore {
	return &UserStore{
		db,
	}
}

type UserStore struct {
	*sql.DB
}

func (u *UserStore) GetUser() ([]facade.UserItem, error) {

	// ceci est le retour d'une requete sql
	users := []facade.UserItem{facade.UserItem{
		ID:       10,
		Email:    "email@mail.fr",
		Password: "pass",
		Role:     "admin",
	}}
	return users, nil
}
