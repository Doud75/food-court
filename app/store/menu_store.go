package store

import (
	"database/sql"
	"fmt"
	"food_court/facade"
)

func NewMenuStore(db *sql.DB) *MenuStore {
	return &MenuStore{
		db,
	}
}

type MenuStore struct {
	*sql.DB
}

func (r *MenuStore) GetMenuByRestaurantID(restaurantID string) ([]facade.MenuItem, error) {
	var menus []facade.MenuItem

	query := `SELECT id, dishes, price, restaurant_id FROM "menu" WHERE restaurant_id = $1`
	rows, err := r.Query(query, restaurantID)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var menu facade.MenuItem
		if err = rows.Scan(&menu.ID, &menu.Dishes, &menu.Price, &menu.RestaurantID); err != nil {
			fmt.Println(err)
			return nil, err
		}
		menus = append(menus, menu)
	}

	if err = rows.Err(); err != nil {
		fmt.Println(err)
		return nil, err
	}

	return menus, nil
}
