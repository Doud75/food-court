package ws

import (
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	Conn       *websocket.Conn
	Message    chan *Message
	RoomID     string `json:"room_id"`
	ID         string `json:"sender_id"`
	SenderName string `json:"sender_name"`
}

type Message struct {
	Content string `json:"content"`
	RoomID  string `json:"room_id"`
}

func (client *Client) WriteMessage() {
	defer func() {
		client.Conn.Close()
	}()

	for {
		message, ok := <-client.Message

		if !ok {
			return
		}

		client.Conn.WriteJSON(message)
	}
}

func (client *Client) ReadMessage(hub *Hub) {
	defer func() {
		hub.Unregister <- client
		client.Conn.Close()
	}()

	for {
		_, messageBytes, err := client.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(
				err,
				websocket.CloseGoingAway,
				websocket.CloseAbnormalClosure,
			) {
				log.Printf("error: %v", err)
			}
			break
		}

		message := &Message{
			Content: string(messageBytes),
			RoomID: client.RoomID,
		}

		hub.Broadcast <- message
	}

}
