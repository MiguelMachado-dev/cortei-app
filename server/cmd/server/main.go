package main

import (
	"cortei-server/internal/config"
	"cortei-server/internal/repository"
	"cortei-server/internal/server"
	"log"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error while loading .env file")
	}

	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
	}

	db := repository.InitDB(cfg.DBPath)
	repo := repository.NewSQLiteRepository(db)
	srv := server.NewServer(repo, cfg.ServerPort)

	log.Printf("Server running on port %s, using SQLite in '%s'.", cfg.ServerPort, cfg.DBPath)
	log.Printf("Access GraphQL playground at: http://localhost:%v", cfg.ServerPort)
	if err := srv.ListenAndServe(); err != nil {
		log.Fatalf("Error starting the server. Error %v", err)
	}
}
