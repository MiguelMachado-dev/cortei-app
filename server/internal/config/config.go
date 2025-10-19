package config

import (
	"fmt"
	"os"
	"strconv"
)

type Config struct {
	DBPath         string
	ServerPort     string
	LogLevel       string
	Environment    string
	MaxConnections int
}

func Load() (*Config, error) {
	cfg := &Config{
		DBPath:      getEnv("DB_PATH", "appointments.db"),
		ServerPort:  ":" + getEnv("SERVER_PORT", "8080"),
		LogLevel:    getEnv("LOG_LEVEL", "info"),
		Environment: getEnv("ENVIRONMENT", "development"),
	}

	maxConn, err := strconv.Atoi(getEnv("MAX_DB_CONNECTIONS", "10"))
	if err != nil {
		return nil, fmt.Errorf("invalid MAX_DB_CONNECTIONS: %w", err)
	}
	cfg.MaxConnections = maxConn

	if err := cfg.validate(); err != nil {
		return nil, fmt.Errorf("invalid configuration: %w", err)
	}

	return cfg, nil
}

func (c *Config) validate() error {
	if len(c.ServerPort) < 2 || c.ServerPort[0] != ':' {
		return fmt.Errorf("invalid server port format: %s", c.ServerPort)
	}
	portStr := c.ServerPort[1:]
	port, err := strconv.Atoi(portStr)
	if err != nil || port < 1 || port > 65535 {
		return fmt.Errorf("invalid server port: %s", c.ServerPort)
	}
	return nil
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}

	return defaultValue
}
