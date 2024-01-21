package controller

import (
	"encoding/json"
	"net/http"
	"food_court/facade"
)

func (h *Handler) GetRestaurant() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")

		restaurants, _ := h.Store.GetRestaurant()
		err := json.NewEncoder(writer).Encode(restaurants)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

func (h *Handler) CreateRestaurant() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")

		var newRestaurant facade.RestaurantItem
		err := json.NewDecoder(request.Body).Decode(&newRestaurant)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusBadRequest)
			return
		}

		restaurantID, err := h.Store.CreateRestaurant(newRestaurant)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}

		response := map[string]interface{}{
			"message":       "Restaurant created successfully",
			"restaurant_id": restaurantID,
		}

		err = json.NewEncoder(writer).Encode(response)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
