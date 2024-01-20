package facade

import "github.com/google/uuid"

type RestaurantItem struct {
	ID       uuid.NullUUID `json:"id"`
	Password string        `json:"password"`
	Name     string        `json:"name"`
	Category string        `json:"category"`
}

type RestaurantStoreInterface interface {
	GetRestaurant() ([]RestaurantItem, error)
	CreateRestaurant(RestaurantItem) (uuid.UUID, error) 
}


