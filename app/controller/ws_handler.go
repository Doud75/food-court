package controller

import (
	"encoding/json"
	"food_court/ws"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/gorilla/websocket"
)

type WebsocketHandler struct {
	hub *ws.Hub
}

type CreateNotificationRoomRequest struct {
	ID string `json:"id"`
}

func NewWebsocketHandler(h *ws.Hub) *WebsocketHandler {
	return &WebsocketHandler{
		hub: h,
	}
}

func (h *WebsocketHandler) CreateNotificationRoom() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")
		req := CreateNotificationRoomRequest{ID: chi.URLParam(request, "id")}

		h.hub.Rooms[req.ID] = &ws.NotificationRoom{
			ID:      req.ID,
			Clients: make(map[string]*ws.Client),
		}

		if err := json.NewEncoder(writer).Encode(req); err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

var upgrader = websocket.Upgrader{
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true //TODO: changer pour le lien du client apres les tests
	},
}

func (h *WebsocketHandler) JoinNotificationRoom() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		conn, err := upgrader.Upgrade(writer, request, nil)

		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}

		roomID := chi.URLParam(request, "id")

		client := &ws.Client{
			Conn: conn,
			
		}
	}
}
