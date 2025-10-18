package main

import (
	"cortei-server/internal/repository"
	"cortei-server/internal/server"
	"log"
)

func main() {
	repo := repository.NewInMemoryAppointmentRepository()

	srv := server.NewServer(repo)

	log.Println("Servidor iniciado na porta :8080")
	log.Println("Acesse o playground em: http://localhost:8080")
	if err := srv.ListenAndServe(); err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
