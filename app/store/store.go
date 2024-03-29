package store

import (
	"database/sql"
	"food_court/facade"
)

func CreateStore(db *sql.DB) *Store {
	return &Store{
		NewUserStore(db),
		NewRestaurantStore(db),
		NewMenuStore(db),
		NewOrderStore(db),
	}
}

type Store struct {
	facade.UserStoreInterface
	facade.RestaurantStoreInterface
	facade.MenuStoreInterface
	facade.OrderStoreInterface
}
