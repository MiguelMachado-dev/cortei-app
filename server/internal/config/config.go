package config

import "os"

type Config struct {
	DBPath     string
	ServerPort string
}

func Load() (*Config, error) {
	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = "appointments.db"
	}

	serverPort := os.Getenv("SERVER_PORT")
	if serverPort == "" {
		serverPort = "8080"
	}

	return &Config{
		DBPath:     dbPath,
		ServerPort: ":" + serverPort,
	}, nil
}
