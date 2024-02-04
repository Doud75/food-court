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



func (o *OrderStore) GetOrdersByUser(userID uuid.UUID) ([]facade.OrderItem, error) {
	query := `SELECT id, dishes_list, total_price, reference, state, user_id, restaurant_id FROM "order" WHERE user_id = $1`
	rows, err := o.Query(query, userID)


	if err != nil {
		fmt.Println("Error querying orders by user:", err)
		return nil, err
	}
	defer rows.Close()

	var orders []facade.OrderItem

	for rows.Next() {
		var order facade.OrderItem
		var dishesList json.RawMessage

		err := rows.Scan(
			&order.ID,
			&dishesList,
			&order.TotalPrice,
			&order.Reference,
			&order.State,
			&order.UserID,
			&order.RestaurantID,
		)
		if err != nil {
			fmt.Println("Error scanning order row:", err)
			return nil, err
		}

		order.DishesList = dishesList
		orders = append(orders, order)
	}

	return orders, nil
}

