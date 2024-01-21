package store

import (
	"database/sql"
	"errors"
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
}

func (u *UserStore) GetUserByMail(email string) (facade.UserItem, error) {
	user := facade.UserItem{}

	if err := u.QueryRow(
		`SELECT id, email, password, role FROM "user" WHERE email = $1`, email,
	).Scan(&user.ID, &user.Email, &user.Password, &user.Role); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return facade.UserItem{}, fmt.Errorf("unknow email : %v", email)
		}
		return facade.UserItem{}, fmt.Errorf("error : %v", err)
	}

	return user, nil
}
