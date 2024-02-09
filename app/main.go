package main

import (
	"database/sql"
	"fmt"
	"food_court/controller"
	"food_court/store"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

func main() {
	connStr := "user=user dbname=FOOD password=password port=5454 sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	if err = db.Ping(); err != nil {
		log.Fatal(err)
	}

	storme := store.CreateStore(db)
	mux := controller.NewHandler(storme)

	err = http.ListenAndServe(":8097", mux)
	if err != nil {
		_ = fmt.Errorf("impossible de lancer le serveur : %w", err)
		return
	}

}
