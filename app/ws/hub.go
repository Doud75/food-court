package ws

type NotificationRoom struct {
	ID      string             `json:"id"`
	Clients map[string]*Client `json:"clients"`
}

type Hub struct {
	Rooms map[string]*NotificationRoom
}

func NewHub() *Hub {
	return &Hub{
		Rooms: make(map[string]*NotificationRoom),
	}
}
