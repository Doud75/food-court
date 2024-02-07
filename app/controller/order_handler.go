package controller

import (
	"encoding/json"
	"github.com/go-chi/chi"
	"github.com/google/uuid"
	"net/http"
)

func (h *Handler) GetOrdersByUser() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")

		userIDString := chi.URLParam(request, "userID")

		if userIDString == "" {
			http.Error(writer, "Missing userID parameter", http.StatusBadRequest)
			return
		}

		userID, err := uuid.Parse(userIDString)
		if err != nil {
			http.Error(writer, "Invalid userID", http.StatusBadRequest)
			return
		}

		orders, err := h.Store.GetOrdersByUser(userID)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}

		err = json.NewEncoder(writer).Encode(orders)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

func (h *Handler) GetPendingOrdersByRestaurant() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")

		restaurantIDString := chi.URLParam(request, "restaurantID")

		restaurantID, err := uuid.Parse(restaurantIDString)

		orders, err := h.Store.GetPendingOrdersByRestaurant(restaurantID)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}

		err = json.NewEncoder(writer).Encode(orders)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

func (h *Handler) UpdateOrderToDone() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")

		orderIDString := chi.URLParam(request, "orderID")
		restaurantIDString := chi.URLParam(request, "restaurantID")

		restaurantID, err := uuid.Parse(restaurantIDString)
		orderID, err := uuid.Parse(orderIDString)

		err = h.Store.UpdateOrderToDone(restaurantID, orderID)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}

		response := map[string]interface{}{
			"message": "Order set to done successfully",
		}

		err = json.NewEncoder(writer).Encode(response)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}


func (h *Handler) AddOrder() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")

		var requestBody struct {
			UserID       uuid.UUID          `json:"user_id"`
			RestaurantID uuid.UUID          `json:"restaurant_id"`
			DishesList   json.RawMessage    `json:"dishes_list"`
			TotalPrice   float64            `json:"total_price"`
		}

		err := json.NewDecoder(request.Body).Decode(&requestBody)
		if err != nil {
			http.Error(writer, "Invalid request body", http.StatusBadRequest)
			return
		}

		orderID, err := h.Store.AddOrder(requestBody.UserID, requestBody.RestaurantID, requestBody.DishesList, requestBody.TotalPrice)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}

		response := map[string]interface{}{
			"order_id": orderID,
			"message":  "Order added successfully",
		}

		err = json.NewEncoder(writer).Encode(response)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
