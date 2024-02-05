package facade

import (
	"github.com/google/uuid"
	"encoding/json"
)

type OrderItem struct {
	ID            uuid.NullUUID   `json:"id"`
	DishesList    json.RawMessage `json:"dishes_list"`
	TotalPrice    float64         `json:"total_price"`
	Reference     int64           `json:"reference"`
	State         string          `json:"state"`
	UserID        uuid.NullUUID   `json:"user_id"`
	RestaurantID  uuid.NullUUID   `json:"restaurant_id"`
}

type OrderItemWithRestaurant struct {
    ID            uuid.NullUUID   `json:"id"`
    DishesList    json.RawMessage `json:"dishes_list"`
    TotalPrice    float64         `json:"total_price"`
    Reference     int64           `json:"reference"`
    State         string          `json:"state"`
    UserID        uuid.NullUUID   `json:"user_id"`
    RestaurantID  uuid.NullUUID   `json:"restaurant_id"`
    RestaurantName string         `json:"restaurant_name"`
}

type OrderStoreInterface interface {
	GetOrdersByUser(uuid.UUID) ([]OrderItemWithRestaurant, error)
}