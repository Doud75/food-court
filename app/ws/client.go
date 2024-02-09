package ws

import "github.com/gorilla/websocket"

type Client struct {
	Conn     *websocket.Conn
	Message  chan *Message
	RoomID   string `json:"room_id"`
	SenderID string `json:"sender_id"`
}

type Message struct {
	Content string `json:"content"`
	RoomID  string `json:"room_id"`
}
