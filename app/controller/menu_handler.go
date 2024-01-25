package controller

import (
	"encoding/json"
	"net/http"

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
