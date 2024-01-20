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

	rows, err := r.Query(`SELECT id, name, category FROM "restaurant"`)
	if err != nil {
		fmt.Println(err)
		return []facade.RestaurantItem{}, err
	}

	defer rows.Close()

	for rows.Next() {
		var restaurant facade.RestaurantItem
		if err = rows.Scan(&restaurant.ID, &restaurant.Name, &restaurant.Category); err != nil {
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
    restaurantID := uuid.New()

    _, err := r.Exec(`
        INSERT INTO "restaurant" ("id", "password", "name", "category")
        VALUES ($1, $2, $3, $4)`,
        restaurantID, newRestaurant.Password, newRestaurant.Name, newRestaurant.Category)

    if err != nil {
        fmt.Println(err)
        return uuid.Nil, err
    }

    return restaurantID, nil
}
