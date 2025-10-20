package server

import (
	"cortei-server/internal/graph"
	"cortei-server/internal/repository"
	"net/http"
	"strings"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

func NewServer(repo repository.AppointmentRepository, port string) *http.Server {
	// Cria o resolver com a dependência do repositório
	resolver := &graph.Resolver{Repo: repo}
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: resolver}))

	mux := http.NewServeMux()
	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))
	mux.Handle("/query", corsMiddleware(srv))

	return &http.Server{
		Addr:    port,
		Handler: mux,
	}
}

func corsMiddleware(next http.Handler) http.Handler {
	allowedOrigin := "http://localhost:5173"

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")

		if origin != "" && strings.EqualFold(origin, allowedOrigin) {
			w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
			w.Header().Set("Vary", "Origin")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
		}

		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
