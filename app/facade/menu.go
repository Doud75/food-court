package facade

import "github.com/google/uuid"

type MenuItem struct {
	ID           uuid.NullUUID `json:"id"`
	Dishes       string        `json:"dishes"`
	Price        float32       `json:"price,string"`
	RestaurantID uuid.NullUUID `json:"restaurant_id"`
}

type MenuItemWithRestaurant struct {
	ID             uuid.UUID `json:"id"`
	Dishes         string    `json:"dishes"`
	Price          float32   `json:"price,string"`
	RestaurantID   uuid.UUID `json:"restaurant_id"`
	RestaurantName string    `json:"restaurant_name"`
}

type MenuStoreInterface interface {
	GetMenuByRestaurantID(restaurantID string) ([]MenuItemWithRestaurant, error)
	RemoveDishesByID(restaurantID uuid.UUID, dishesID uuid.UUID) error
	ModifyDishes(restaurantID uuid.UUID, dishesID uuid.UUID, menu MenuItem) error
	AddMenu(MenuItem) (uuid.UUID, error)
}
