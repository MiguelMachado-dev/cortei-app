package main

import (
	"context"
	"cortei-server/internal/config"
	"cortei-server/internal/repository"
	"cortei-server/internal/server"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

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

	db := repository.InitDB(cfg.DBPath, cfg)
	defer db.Close() // Garante que o banco seja fechado ao final

	repo := repository.NewSQLiteRepository(db)
	srv := server.NewServer(repo, cfg.ServerPort)

	// Canal para capturar sinais de interrupção (CTRL+C, SIGTERM)
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	// Inicia o servidor em uma goroutine separada
	go func() {
		log.Printf("Server running on port %s, using SQLite in '%s'.", cfg.ServerPort, cfg.DBPath)
		log.Printf("Access GraphQL playground at: http://localhost%v", cfg.ServerPort)
		log.Println("Press CTRL+C to shutdown gracefully")

		if err := srv.ListenAndServe(); err != nil {
			log.Printf("Server error: %v", err)
		}
	}()

	// Bloqueia até receber sinal de interrupção
	<-quit
	log.Println("\n🛑 Shutdown signal received, gracefully shutting down server...")

	// Contexto com timeout de 30 segundos para o shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Desliga o servidor graciosamente
	if err := srv.Shutdown(ctx); err != nil {
		log.Printf("❌ Server forced to shutdown: %v", err)
	} else {
		log.Println("✅ Server stopped gracefully!")
	}
}
