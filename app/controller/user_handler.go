package controller

import (
	"encoding/json"
	"net/http"
)

func (h *Handler) ShowUser() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")

		todos, _ := h.Store.GetUser()
		err := json.NewEncoder(writer).Encode(todos)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}