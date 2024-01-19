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

	rows, err := r.Query(`SELECT id, dishes, price, restaurant_id FROM "menu"`)
	if err != nil {
		fmt.Println(err)
		return []facade.MenuItem{}, err
	}

	defer rows.Close()

	for rows.Next() {
		var menu facade.MenuItem
		if err = rows.Scan(&menu.ID, &menu.Dishes, &menu.Price, &menu.RestaurantID); err != nil {
			fmt.Println(err)
			return []facade.MenuItem{}, err
		}
		menus = append(menus, menu)
	}

	if err = rows.Err(); err != nil {
		fmt.Println(err)
		return []facade.MenuItem{}, err
	}

	return menus, nil
}
