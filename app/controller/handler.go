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
  	handler.Get("/restaurants", handler.GetRestaurant())
	handler.Post("/insert-restaurant", handler.CreateRestaurant())
	handler.Get("/restaurants/{restaurantID}/menus", handler.GetMenuByRestaurantID())
	handler.Delete("/delete-restaurant", handler.DeleteRestaurant())

	return handler
}

type Handler struct {
	*chi.Mux
	*store.Store
}
