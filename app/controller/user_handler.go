package controller

import (
	"encoding/json"
	"food_court/facade"
	"food_court/helper"
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

		lostUser := struct {
			Error string `json:"error"`
		}{"utilisateur ou mot de passe incorecte"}

		res := struct {
			Token string `json:"token"`
		}{}

		err := json.NewDecoder(request.Body).Decode(&auth)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusUnprocessableEntity)
			return
		}

		user, err := h.Store.GetUserByMail(auth.Email)
		if err != nil {
            http.Error(writer, "Identifiant incorrect", http.StatusUnauthorized)
            return
        }

		if user.Email == "" || user.Password == "" {
			err = json.NewEncoder(writer).Encode(lostUser)
			if err != nil {
				http.Error(writer, err.Error(), http.StatusInternalServerError)
				return
			}
		}

		match := facade.CheckPasswordHash(auth.Password, user.Password)

		if match == false {
			err = json.NewEncoder(writer).Encode(lostUser)
			if err != nil {
				http.Error(writer, err.Error(), http.StatusInternalServerError)
				return
			}
			return
		}

		token, err := helper.CreatJwt(user.ID, user.Email, user.Role)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}

		res.Token = token

		err = json.NewEncoder(writer).Encode(res)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
