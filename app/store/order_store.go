package store

import (
	"database/sql"
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

func (r *RestaurantStore) AddToOrder(newOrder facade.OrderItem) (uuid.UUID, error) {
	var existingID uuid.UUID
	err := r.QueryRow(`SELECT id FROM "order" WHERE name = $1`, newOrder.ID).Scan(&existingID)
	if err == nil {
		return uuid.Nil, fmt.Errorf("The order '%s' already exist", newOrder.orderID)

		// ici gérer si le panier a déjà été créé
	}

	orderID := uuid.New()

	_, err = r.Exec(`
        INSERT INTO "order" ("id", "dishes_list", "total_price", "reference", "user_id, "restaurant_id")
        VALUES ($1, $2, $3, $4, $5)`,
		orderID, newOrder.dishes_list, newOrder.total_price, newOrder.reference, newOrder.user_id, newOrder.restaurant_id)

	if err != nil {
		fmt.Println(err)
		return uuid.Nil, err
	}

	return orderID, nil
}
