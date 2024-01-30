package store

import (
	"database/sql"
	"errors"
	"fmt"
	"food_court/facade"
	"github.com/google/uuid"
)

func NewMenuStore(db *sql.DB) *MenuStore {
	return &MenuStore{
		db,
	}
}

type MenuStore struct {
	*sql.DB
}

func (m *MenuStore) GetMenuByRestaurantID(restaurantID string) ([]facade.MenuItem, error) {
	var menus []facade.MenuItem

	query := `SELECT id, dishes, price, restaurant_id FROM "menu" WHERE restaurant_id = $1`
	rows, err := m.Query(query, restaurantID)
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

func (m *MenuStore) RemoveDishesByID(restaurantID string, dishesID string) error {
	var existingID uuid.NullUUID
	if err := m.QueryRow(`SELECT id FROM "menu" WHERE restaurant_id = $1 AND id = $2`, restaurantID, dishesID).
		Scan(&existingID); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return fmt.Errorf("remove dishes by ID: %w", err)
		}

		fmt.Println(err)
		return err
	}

	if _, err := m.Exec(`DELETE FROM "menu" WHERE restaurant_id = $1 AND id = $2`, restaurantID, dishesID); err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}
