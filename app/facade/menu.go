package facade

import "github.com/google/uuid"

type MenuItem struct {
	ID           uuid.NullUUID `json:"id"`
	Dishes       string        `json:"dishes"`
	Price        float32       `json:"price,string"`
	RestaurantID uuid.NullUUID `json:"restaurant_id"`
}

type MenuStoreInterface interface {
	GetMenuByRestaurantID(restaurantID string) ([]MenuItem, error)
	RemoveDishesByID(restaurantID uuid.UUID, dishesID uuid.UUID) error
	ModifyDishes(restaurantID uuid.UUID, dishesID uuid.UUID, menu MenuItem) error
	AddMenu(MenuItem) (uuid.UUID, error)
}
