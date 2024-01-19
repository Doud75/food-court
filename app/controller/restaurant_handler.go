package controller

import (
	"encoding/json"
	"net/http"
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
