package store

import (
	"database/sql"
	"fmt"
	"food_court/facade"
	"github.com/google/uuid"
)

func NewRestaurantStore(db *sql.DB) *RestaurantStore {
	return &RestaurantStore{
		db,
	}
}

type RestaurantStore struct {
	*sql.DB
}

func (r *RestaurantStore) GetRestaurant() ([]facade.RestaurantItem, error) {
	var restaurants []facade.RestaurantItem

	rows, err := r.Query(`SELECT id, name, category, description FROM "restaurant"`)
	if err != nil {
		fmt.Println(err)
		return []facade.RestaurantItem{}, err
	}

	defer rows.Close()

	for rows.Next() {
		var restaurant facade.RestaurantItem
		if err = rows.Scan(&restaurant.ID, &restaurant.Name, &restaurant.Category, &restaurant.Description); err != nil {
			fmt.Println(err)
			return []facade.RestaurantItem{}, err
		}
		restaurants = append(restaurants, restaurant)
	}

	if err = rows.Err(); err != nil {
		fmt.Println(err)
		return []facade.RestaurantItem{}, err
	}

	return restaurants, nil
}

func (r *RestaurantStore) CreateRestaurant(newRestaurant facade.RestaurantItem) (uuid.UUID, error) {
	var existingID uuid.UUID
	err := r.QueryRow(`SELECT id FROM "restaurant" WHERE name = $1`, newRestaurant.Name).Scan(&existingID)
	if err == nil {
		return uuid.Nil, fmt.Errorf("The name restaurant '%s' already exist", newRestaurant.Name)
	} else if err != sql.ErrNoRows {
		fmt.Println(err)
		return uuid.Nil, err
	}

	restaurantID := uuid.New()

	_, err = r.Exec(`
        INSERT INTO "restaurant" ("id", "password", "name", "category", "description")
        VALUES ($1, $2, $3, $4, $5)`,
		restaurantID, newRestaurant.Password, newRestaurant.Name, newRestaurant.Category, newRestaurant.Description)

	if err != nil {
		fmt.Println(err)
		return uuid.Nil, err
	}

	return restaurantID, nil
}

func (r *RestaurantStore) DeleteRestaurant(restaurantID uuid.UUID) error {
	var existingID uuid.UUID
	err := r.QueryRow(`SELECT id FROM "restaurant" WHERE id = $1`, restaurantID).Scan(&existingID)
	if err == sql.ErrNoRows {
		return fmt.Errorf("The ID '%s' of the restaurant doesn't exist", restaurantID)
	} else if err != nil {
		fmt.Println(err)
		return err
	}

	_, err = r.Exec(`DELETE FROM "restaurant" WHERE id = $1`, restaurantID)
	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}
