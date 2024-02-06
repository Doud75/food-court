package store

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"food_court/facade"
	"github.com/google/uuid"
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

func (o *OrderStore) GetPendingOrdersByRestaurant(restaurantID uuid.UUID) ([]facade.OrderItem, error) {
	query := `SELECT id, dishes_list, total_price, reference, state, user_id, restaurant_id FROM "order" WHERE restaurant_id = $1 AND state = 'pending'`
	rows, err := o.Query(query, restaurantID)

	if err != nil {
		fmt.Println("Error querying orders by restaurant:", err)
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

func (o *OrderStore) UpdateOrderToDone(restaurantID uuid.UUID, orderID uuid.UUID) error {
	var existingID uuid.NullUUID
	if err := o.QueryRow(`SELECT id FROM "order" WHERE restaurant_id = $1 AND id = $2`, restaurantID, orderID).
		Scan(&existingID); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return fmt.Errorf("UpdateOrderToDone: %w", err)
		}

		fmt.Println(err)
		return err
	}

	if _, err := o.Exec(`UPDATE "order" SET state = 'done' WHERE id = $1`, orderID); err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}
