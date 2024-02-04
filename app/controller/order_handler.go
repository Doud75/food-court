package controller

import (
	"encoding/json"
	"food_court/facade"
	"net/http"
)

func (h *Handler) AddToOrder() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")

		var newOrder facade.OrderItem
		err := json.NewDecoder(request.Body).Decode(&newOrder)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusBadRequest)
			return
		}

		orderID, err := h.Store.CreateRestaurant(newOrder)
		if err != nil {
			writer.WriteHeader(409)
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}

		response := map[string]interface{}{
			"message":  "Dish added successfully!",
			"order_id": orderID,
		}

		err = json.NewEncoder(writer).Encode(response)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
