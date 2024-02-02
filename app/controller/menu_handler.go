package controller

import (
	"encoding/json"
	"net/http"
	"food_court/facade"
	"github.com/go-chi/chi"
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

		dishesID := chi.URLParam(request, "dishesID")
		restaurantID := chi.URLParam(request, "restaurantID")

		err := h.Store.RemoveDishesByID(restaurantID, dishesID)
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
			"menuID": menuID,
			"message": "Menu added successfully",
		}

		err = json.NewEncoder(writer).Encode(response)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}