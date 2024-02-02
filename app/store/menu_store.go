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


func (m *MenuStore) AddMenu(menu facade.MenuItem) (uuid.UUID, error) {
	var existingMenuID uuid.UUID
	err := m.QueryRow(`SELECT id FROM "menu" WHERE dishes = $1 AND restaurant_id = $2`, menu.Dishes, menu.RestaurantID).
		Scan(&existingMenuID)
	if err == nil {
		return uuid.Nil, errors.New("Menu name already exists")
	} else if err != sql.ErrNoRows {
		fmt.Println(err)
		return uuid.Nil, err
	}
	
	menuID := uuid.New()

	query := `
		INSERT INTO "menu" (id, dishes, price, restaurant_id)
		VALUES ($1, $2, $3, $4)
		RETURNING id
	`

	err = m.QueryRow(query, menuID, menu.Dishes, menu.Price, menu.RestaurantID).
		Scan(&menuID)
	if err != nil {
		fmt.Println(err)
		return uuid.Nil, err
	}

	return menuID, nil
}