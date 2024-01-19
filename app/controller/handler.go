package controller

import (
	"food_court/store"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func NewHandler(store *store.Store) *Handler {
	handler := &Handler{
		chi.NewRouter(),
		store,
	}

	handler.Use(middleware.Logger)

	handler.Get("/", handler.ShowUser())
	handler.Get("/restaurants", handler.GetRestaurant())
	handler.Get("/restaurants/{restaurantID}/menus", handler.GetMenuByRestaurantID())

	return handler
}

type Handler struct {
	*chi.Mux
	*store.Store
}
