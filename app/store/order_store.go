package store

import (
	"database/sql"
	"encoding/json"
	"github.com/google/uuid"
	"food_court/facade"
	"fmt"
)

func NewOrderStore(db *sql.DB) *OrderStore {
	return &OrderStore{
		db,
	}
}

type OrderStore struct {
	*sql.DB
}



func (o *OrderStore) GetOrdersByUser(userID uuid.UUID) ([]facade.OrderItemWithRestaurant, error) {
	query := `
		SELECT o.id, o.dishes_list, o.total_price, o.reference, o.state, o.user_id, o.restaurant_id, r.name
		FROM "order" o
		JOIN "restaurant" r ON o.restaurant_id = r.id
		WHERE o.user_id = $1
	`
	rows, err := o.Query(query, userID)
	if err != nil {
		return nil, fmt.Errorf("error querying orders by user: %v", err)
	}
	defer rows.Close()

	var orders []facade.OrderItemWithRestaurant

	for rows.Next() {
		var order facade.OrderItemWithRestaurant
		var dishesList json.RawMessage

		err := rows.Scan(
			&order.ID,
			&dishesList,
			&order.TotalPrice,
			&order.Reference,
			&order.State,
			&order.UserID,
			&order.RestaurantID,
			&order.RestaurantName,
		)
		if err != nil {
			return nil, fmt.Errorf("error scanning order row: %v", err)
		}

		order.DishesList = dishesList
		orders = append(orders, order)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over order rows: %v", err)
	}

	return orders, nil
}


