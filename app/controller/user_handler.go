package controller

import (
	"encoding/json"
	"net/http"
)

func (h *Handler) ShowUser() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")

		users, _ := h.Store.GetUser()
		err := json.NewEncoder(writer).Encode(users)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

func (h *Handler) Login() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")
		auth := struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}{}

		err := json.NewDecoder(request.Body).Decode(&auth)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusUnprocessableEntity)
			return
		}

		user, err := h.Store.GetUserByMail(auth.Email)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusNotFound)
			return
		}

		err = json.NewEncoder(writer).Encode(user)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
