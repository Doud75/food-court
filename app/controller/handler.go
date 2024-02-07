package controller

import (
	"fmt"
	"food_court/store"
	"io"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/rs/cors"

	"golang.org/x/net/websocket"
)

func NewWebsocketHandler() *WebsocketHandler {
	return &WebsocketHandler{
		conns: make(map[*websocket.Conn]bool),
	}
}

func (h *WebsocketHandler) HandleWS(ws *websocket.Conn) {
	h.conns[ws] = true

	h.ReadLoop(ws)
}

func (h *WebsocketHandler) ReadLoop(ws *websocket.Conn) {
	buf := make([]byte, 1024)

	for {
		n, err := ws.Read(buf)
		if err != nil {
			if err == io.EOF {
				break
			}
			fmt.Println("read error:", err)
			continue
		}
		msg := buf[:n]
		h.Broadcast(msg)
	}
}

func (h *WebsocketHandler) Broadcast(b []byte) {
	for ws := range h.conns {
		go func(ws *websocket.Conn) {
			if _, err := ws.Write(b); err != nil {
				fmt.Println("write error:", err)
			}
		}(ws)
	}
}

func NewHandler(store *store.Store) *Handler {
	handler := &Handler{
		chi.NewRouter(),
		store,
	}

	userver := NewWebsocketHandler()
	rserver := NewWebsocketHandler()
	
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
	handler.Get("/orders-client/{userID}", handler.GetOrdersByUser())
	handler.Get("/orders-restaurant/{restaurantID}", handler.GetPendingOrdersByRestaurant())
	handler.Post("/orders/{restaurantID}/{orderID}", handler.UpdateOrderToDone())
	handler.Handle("/user", websocket.Handler(userver.HandleWS))
	handler.Handle("/restaurant", websocket.Handler(rserver.HandleWS))
	return handler
}

type Handler struct {
	*chi.Mux
	*store.Store
}

type WebsocketHandler struct {
	conns map[*websocket.Conn]bool
}