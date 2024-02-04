package facade

import "github.com/google/uuid"

type OrderItem struct {
	ID           uuid.NullUUID `json:"id"`
	Dishes_list  string        `json:"dishes_list"`
	Total_price  float32       `json:"total_price,string"`
	Reference    float32       `json:"reference"`
	User_id      uuid.NullUUID `json:"user_id"`
	RestaurantID uuid.NullUUID `json:"restaurant_id"`
}

type OrderID struct {
	ID uuid.NullUUID `json:"id"`
}

type OrderStoreInterface interface {
	AddToOrder(OrderItem) (uuid.UUID, error)
}
