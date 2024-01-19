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
	/*User*/
	handler.Get("/", handler.ShowUser())
	handler.Post("/login", handler.Login())
	/*Restaurant*/
	handler.Get("/restaurants", handler.GetRestaurant())

	return handler
}

type Handler struct {
	*chi.Mux
	*store.Store
}
