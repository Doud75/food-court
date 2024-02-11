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
		return true // TODO: changer pour le lien du client apres les tests
	},
}

type NotificationRequest struct {
	SenderID string `json:"sender_id"`
	SenderName string `json:"sender_name"`
	OrderID string `json:"order_id"`
	MessageContent string `json:"message_content"`
}

func (h *WebsocketHandler) JoinNotificationRoom() http.HandlerFunc {
	var notificationReq NotificationRequest
	return func(writer http.ResponseWriter, request *http.Request) {
		conn, err := upgrader.Upgrade(writer, request, nil)

		if err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}

		if err := json.NewDecoder(request.Body).Decode(&notificationReq); err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
			return
		}

		roomID := chi.URLParam(request, "id")

		client := &ws.Client{
			Conn: conn,
			Message: make(chan *ws.Message, 10),
			ID: notificationReq.SenderID,
			SenderName: notificationReq.SenderName,
			RoomID: roomID,
		}

		message := &ws.Message{
			Content: notificationReq.SenderName,
			RoomID: roomID,
		}

		h.hub.Register <- client
		h.hub.Broadcast <- message

		go client.WriteMessage()
		client.ReadMessage(h.hub)
	}
}
