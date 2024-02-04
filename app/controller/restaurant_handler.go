package controller

import (
	"encoding/json"
	"net/http"
	"food_court/facade"
    "food_court/helper"
)

func (h *Handler) LoginRestaurateur() http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
       


        lostUser := struct {
			Error string `json:"error"`
		}{"utilisateur ou mot de passe incorecte"}
        
        res := struct {
			Token string `json:"token"`
		}{}

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

		if match == false {
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

		var newRestaurant facade.RestaurantItem
		err := json.NewDecoder(request.Body).Decode(&newRestaurant)
		if err != nil {
			http.Error(writer, err.Error(), http.StatusBadRequest)
			return
		}

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
