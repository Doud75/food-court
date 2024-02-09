package controller

import (
	"encoding/json"
	"food_court/facade"
	"food_court/helper"
	"io/ioutil"
	"net/http"

	"github.com/google/uuid"
)

func (h *Handler) LoginRestaurateur() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		lostUser := struct {
			Error string `json:"error"`
		}{"utilisateur ou mot de passe incorrecte"}

		var res struct {
			Token  string    `json:"token"`
			RestID uuid.UUID `json:"restaurant_id"`
		}

		var loginData struct {
			Name     string `json:"name"`
			Password string `json:"password"`
		}
		err := json.NewDecoder(r.Body).Decode(&loginData)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		restaurant, err := h.Store.GetRestaurantByName(loginData.Name)
		if err != nil {
			http.Error(w, "Identifiant incorrect", http.StatusUnauthorized)
			return
		}

		match := facade.CheckPasswordHash(loginData.Password, restaurant.Password)

		if !match {
			err = json.NewEncoder(w).Encode(lostUser)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			return
		}

		token, err := helper.CreatJwt(restaurant.ID, restaurant.Name, "restaurant")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		res.Token = token
		res.RestID = restaurant.ID.UUID

		err = json.NewEncoder(w).Encode(res)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

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

		err := request.ParseMultipartForm(10 << 20) // fix max memory bytes
		if err != nil {
			http.Error(writer, err.Error(), http.StatusBadRequest)
			return
		}

		var newRestaurant facade.RestaurantItem
		newRestaurant.Name = request.FormValue("name")
		newRestaurant.Category = request.FormValue("category")
		newRestaurant.Password = request.FormValue("password")

		file, _, err := request.FormFile("image")
		if err != nil {
			http.Error(writer, err.Error(), http.StatusBadRequest)
			return
		}
		defer file.Close()

		// // Convert img to []byte
		imageBytes, err := ioutil.ReadAll(file)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
		newRestaurant.Image = imageBytes

		restaurantID, err := h.Store.CreateRestaurant(newRestaurant)
		if err != nil {
			writer.WriteHeader(409)
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

func (h *Handler) DeleteRestaurant() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")

		var requestBody facade.RestaurantID

		err := json.NewDecoder(request.Body).Decode(&requestBody)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusBadRequest)
			return
		}

		if requestBody.ID.Valid {
			err = h.Store.DeleteRestaurant(requestBody.ID.UUID)
			if err != nil {
				http.Error(writer, err.Error(), http.StatusInternalServerError)
				return
			}

			response := map[string]interface{}{
				"message": "Restaurant deleted successfully",
			}

			err = json.NewEncoder(writer).Encode(response)
			if err != nil {
				http.Error(writer, err.Error(), http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(writer, "Invalid or missing restaurant ID", http.StatusBadRequest)
		}
	}
}
