package facade

import "github.com/google/uuid"

type MenuItem struct {
	ID           uuid.NullUUID `json:"id"`
	Dishes       string        `json:"dishes"`
	Price        float32       `json:"price"`
	RestaurantID uuid.NullUUID `json:"restaurant_id"`
}

type MenuStoreInterface interface {
	GetMenuByRestaurantID(restaurantID string) ([]MenuItem, error)
	RemoveDishesByID(restaurantID string, dishesID string) error
	AddMenu(MenuItem)(uuid.UUID, error)
}
