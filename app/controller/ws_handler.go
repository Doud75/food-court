package controller

import (
	"encoding/json"
	"food_court/ws"
	"net/http"
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
		var req CreateNotificationRoomRequest

		if err := json.NewDecoder(request.Body).Decode(&req); err != nil {
			http.Error(writer, err.Error(), http.StatusBadRequest)
			return
		}

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
