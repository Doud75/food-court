package controller

import (
	"encoding/json"
	"food_court/facade"
	"github.com/go-chi/chi"
	"github.com/google/uuid"
	"net/http"
)

func (h *Handler) GetMenuByRestaurantID() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")

		restaurantID := chi.URLParam(request, "restaurantID")
		menu, _ := h.Store.GetMenuByRestaurantID(restaurantID)
		err := json.NewEncoder(writer).Encode(menu)
		if err != nil {
			http.Error(writer, "Invalid restaurant ID", http.StatusBadRequest)
			return
		}
	}
}

func (h *Handler) RemoveDishesByID() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")

		dishesIDString := chi.URLParam(request, "dishesID")
		restaurantIDString := chi.URLParam(request, "restaurantID")

		restaurantID, err := uuid.Parse(restaurantIDString)
		dishesID, err := uuid.Parse(dishesIDString)

		err = h.Store.RemoveDishesByID(restaurantID, dishesID)
		if err != nil {
			http.Error(writer, "Invalid restaurant ID or dishesID", http.StatusBadRequest)
			return
		}

		response := map[string]interface{}{
			"message": "Dishes deleted successfully",
		}

		err = json.NewEncoder(writer).Encode(response)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

func (h *Handler) ModifyDishes() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")
		var menu facade.MenuItem

		dishesIDString := chi.URLParam(request, "dishesID")
		restaurantIDString := chi.URLParam(request, "restaurantID")
		err := json.NewDecoder(request.Body).Decode(&menu)
		if err != nil {
			http.Error(writer, "Invalid request body", http.StatusBadRequest)
			return
		}

		restaurantID, err := uuid.Parse(restaurantIDString)
		dishesID, err := uuid.Parse(dishesIDString)

		err = h.Store.ModifyDishes(restaurantID, dishesID, menu)
		if err != nil {
			http.Error(writer, "Invalid restaurant ID or dishesID", http.StatusBadRequest)
			return
		}

		response := map[string]interface{}{
			"message": "Dishes modify successfully",
		}

		err = json.NewEncoder(writer).Encode(response)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

func (h *Handler) AddMenu() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")

		var menu facade.MenuItem
		err := json.NewDecoder(request.Body).Decode(&menu)
		if err != nil {
			http.Error(writer, "Invalid request body", http.StatusBadRequest)
			return
		}

		menuID, err := h.Store.AddMenu(menu)
		if err != nil {
			writer.WriteHeader(409)
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}

		response := map[string]interface{}{
			"menuID":  menuID,
			"message": "Menu added successfully",
		}

		err = json.NewEncoder(writer).Encode(response)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
