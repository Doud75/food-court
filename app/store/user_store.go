package store

import (
	"database/sql"
	"fmt"
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
	var users []facade.UserItem

	rows, err := u.Query(`SELECT id, email, role FROM "user"`)
	if err != nil {
		fmt.Println(err)
		return []facade.UserItem{}, err
	}

	defer rows.Close()

	for rows.Next() {
		var user facade.UserItem
		if err = rows.Scan(&user.ID, &user.Email, &user.Role); err != nil {
			fmt.Println(err)
			return []facade.UserItem{}, err
		}
		users = append(users, user)
	}

	if err = rows.Err(); err != nil {
		fmt.Println(err)
		return []facade.UserItem{}, err
	}

	return users, nil

	/*	// ceci est le retour d'une requete sql
		users := []facade.UserItem{facade.UserItem{
			ID:       10,
			Email:    "email@mail.fr",
			Password: "pass",
			Role:     "admin",
		}}
		return users, nil*/
}
