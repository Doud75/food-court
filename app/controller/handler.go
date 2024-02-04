package controller

import (
	"food_court/store"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/rs/cors"
)

func NewHandler(store *store.Store) *Handler {
	handler := &Handler{
		chi.NewRouter(),
		store,
	}

	corsOptions := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	handler.Use(corsOptions.Handler)
	handler.Use(middleware.Logger)
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
	/*Order*/
	handler.Get("/orders/{userID}", handler.GetOrdersByUser())

	return handler
}

type Handler struct {
	*chi.Mux
	*store.Store
}
