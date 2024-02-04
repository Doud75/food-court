package controller

import (
	"encoding/json"
	"net/http"
	"github.com/google/uuid"
	"github.com/go-chi/chi"
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


