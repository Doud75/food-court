package controller

import (
	// "food_court/helper"
	"food_court/store"
	// "net/http"
	// "strings"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/rs/cors"
)

func NewHandler(store *store.Store) *Handler {
	handler := &Handler{
		chi.NewRouter(),
		store,
	}

	// Set up CORS middleware
	corsOptions := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	handler.Use(corsOptions.Handler)
	handler.Use(middleware.Logger)
	// handler.Use(TokenMiddleware)

	/*User*/
	handler.Get("/", handler.ShowUser())
	handler.Post("/login", handler.Login())
	/*Restaurant*/
	handler.Post("/login-restaurant", handler.LoginRestaurateur())
	handler.Get("/restaurants", handler.GetRestaurant())
	handler.Post("/insert-restaurant", handler.CreateRestaurant())
	handler.Delete("/delete-restaurant", handler.DeleteRestaurant())
	/*Menu*/
	handler.Get("/restaurants/{restaurantID}/menus", handler.GetMenuByRestaurantID())
	handler.Delete("/restaurants/{restaurantID}/delete-dishes/{dishesID}", handler.RemoveDishesByID())
	handler.Post("/restaurants/{restaurantID}/modify-dishes/{dishesID}", handler.ModifyDishes())
	handler.Post("/insert-menu", handler.AddMenu())
	handler.Post("/insert-order", handler.AddOrder())
	/*Order*/
	handler.Get("/orders-client/{userID}", handler.GetOrdersByUser())
	handler.Get("/orders-restaurant/{restaurantID}", handler.GetPendingOrdersByRestaurant())
	handler.Post("/orders/{restaurantID}/{orderID}", handler.UpdateOrderToDone())

	return handler
}

type Handler struct {
	*chi.Mux
	*store.Store
}

// func TokenMiddleware(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

// 		if r.URL.Path == "/login" || r.URL.Path == "/login-restaurant" {
// 			next.ServeHTTP(w, r)
// 			return
// 		}
// 		tokenString := r.Header.Get("Authorization")
// 		if tokenString == "" {
// 			http.Error(w, "Authorization header missing", http.StatusUnauthorized)
// 			return
// 		}

// 		tokenParts := strings.Split(tokenString, " ")
// 		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
// 			http.Error(w, "Invalid token format", http.StatusUnauthorized)
// 			return
// 		}

// 		tokenString = tokenParts[1]

// 		valid, err := helper.CheckJwt(tokenString)
// 		if err != nil || !valid {
// 			http.Error(w, "Invalid token", http.StatusUnauthorized)
// 			return
// 		}

// 		next.ServeHTTP(w, r)
// 	})
// }
