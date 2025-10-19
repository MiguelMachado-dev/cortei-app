package server

import (
	"cortei-server/internal/graph"
	"cortei-server/internal/repository"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

func NewServer(repo repository.AppointmentRepository, port string) *http.Server {
	// Cria o resolver com a dependência do repositório
	resolver := &graph.Resolver{Repo: repo}
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: resolver}))

	mux := http.NewServeMux()
	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))
	mux.Handle("/query", srv)

	return &http.Server{
		Addr:    port,
		Handler: mux,
	}
}
