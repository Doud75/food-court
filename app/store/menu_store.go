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

func (m *MenuStore) GetMenuByRestaurantID(restaurantID string) ([]facade.MenuItemWithRestaurant, error) {
	var menusWithRestaurant []facade.MenuItemWithRestaurant

	query := `
		SELECT m.id, m.dishes, m.price, m.restaurant_id, r.name
		FROM "menu" m
		JOIN "restaurant" r ON m.restaurant_id = r.id
		WHERE m.restaurant_id = $1
	`

	rows, err := m.Query(query, restaurantID)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var menuWithRestaurant facade.MenuItemWithRestaurant
		if err = rows.Scan(&menuWithRestaurant.ID, &menuWithRestaurant.Dishes, &menuWithRestaurant.Price, &menuWithRestaurant.RestaurantID, &menuWithRestaurant.RestaurantName); err != nil {
			fmt.Println(err)
			return nil, err
		}
		menusWithRestaurant = append(menusWithRestaurant, menuWithRestaurant)
	}

	if err = rows.Err(); err != nil {
		fmt.Println(err)
		return nil, err
	}

	return menusWithRestaurant, nil
}

func (m *MenuStore) RemoveDishesByID(restaurantID uuid.UUID, dishesID uuid.UUID) error {
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

func (m *MenuStore) ModifyDishes(restaurantID uuid.UUID, dishesID uuid.UUID, menu facade.MenuItem) error {
	var existingID uuid.NullUUID
	if err := m.QueryRow(`SELECT id FROM "menu" WHERE restaurant_id = $1 AND id = $2`, restaurantID, dishesID).
		Scan(&existingID); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return fmt.Errorf("modify dishes: %w", err)
		}

		fmt.Println(err)
		return err
	}

	if _, err := m.Exec(`UPDATE "menu" SET dishes = $1, price = $2 WHERE id = $3`, menu.Dishes, menu.Price, dishesID); err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

func (m *MenuStore) AddMenu(menu facade.MenuItem, imagePath string) (uuid.UUID, error) {

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
		INSERT INTO "menu" (id, dishes, price, restaurant_id, image_path)
		VALUES ($1, $2, $3, $4)
		RETURNING id
	`

	err = m.QueryRow(query, menuID, menu.Dishes, menu.Price, menu.RestaurantID, imagePath).
		Scan(&menuID)
	if err != nil {
		fmt.Println(err)
		return uuid.Nil, err
	}

	return menuID, nil
}
