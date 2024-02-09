package facade

import "github.com/google/uuid"

type RestaurantItem struct {
	ID          uuid.NullUUID `json:"id"`
	Password    string        `json:"password"`
	Name        string        `json:"name"`
	Category    string        `json:"category"`
	Description string        `json:"description"`
	Image       []byte        `json:"-"`
}

type RestaurantID struct {
	ID uuid.NullUUID `json:"id"`
}

type RestaurantStoreInterface interface {
	GetRestaurantByName(name string) (RestaurantItem, error)
	GetRestaurant() ([]RestaurantItem, error)
	CreateRestaurant(RestaurantItem) (uuid.UUID, error)
	DeleteRestaurant(uuid.UUID) error
}
