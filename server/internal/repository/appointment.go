package repository

import (
	"context"
	"cortei-server/internal/config"
	"cortei-server/internal/domain"
	"cortei-server/internal/errors"
	"database/sql"
	"fmt"
	"log"
	"log/slog"
	"time"

	"github.com/google/uuid"
	_ "github.com/mattn/go-sqlite3"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

// Our repository contract
type AppointmentRepository interface {
	Create(ctx context.Context, appointment *domain.Appointment) (*domain.Appointment, error)
	Delete(ctx context.Context, id domain.AppointmentID) error
	List(ctx context.Context) ([]*domain.Appointment, error)
	GetByDay(ctx context.Context, date string) ([]*domain.Appointment, error)
}

type sqliteRepository struct {
	db *sql.DB
}

func NewSQLiteRepository(db *sql.DB) AppointmentRepository {
	return &sqliteRepository{
		db: db,
	}
}

func InitDB(filepath string, cfg *config.Config) *sql.DB {
	db, err := sql.Open("sqlite3", filepath)
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	// Configure connection pooling
	db.SetMaxOpenConns(cfg.MaxConnections)
	db.SetMaxIdleConns(cfg.MaxConnections / 2)
	db.SetConnMaxLifetime(time.Hour)

	// Verify the connection is working
	if err := db.Ping(); err != nil {
		log.Fatalf("Error pinging database: %v", err)
	}

	createTableSQL := `
	CREATE TABLE IF NOT EXISTS appointments (
		"id" TEXT NOT NULL PRIMARY KEY,
		"client_name" TEXT,
		"date" TEXT,
		"time" TEXT,
		"created_at" DATETIME
	);`

	_, err = db.Exec(createTableSQL)
	if err != nil {
		log.Fatalf("Error creating table: %v", err)
	}

	// Create indexes for query optimization
	createIndexesSQL := []string{
		`CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);`,
		`CREATE INDEX IF NOT EXISTS idx_appointments_datetime ON appointments(date, time);`,
	}

	for _, indexSQL := range createIndexesSQL {
		_, err = db.Exec(indexSQL)
		if err != nil {
			log.Fatalf("Error creating index: %v", err)
		}
	}

	log.Printf("Database initialized with connection pool (Max: %d, Idle: %d, Lifetime: 1h)\n",
		cfg.MaxConnections, cfg.MaxConnections/2)
	log.Println("Table 'appointments' created or already exists.")
	log.Println("Database indexes created for optimized queries.")
	return db
}

func (r *sqliteRepository) Create(ctx context.Context, app *domain.Appointment) (*domain.Appointment, error) {
	if app.ClientName == "" {
		return nil, &errors.ValidationError{Field: "clientName", Message: "cannot be empty"}
	}

	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()

	app.ID = uuid.NewString()
	app.CreatedAt = time.Now()

	const query = `INSERT INTO appointments (id, client_name, date, time, created_at)
				   VALUES (?, ?, ?, ?, ?)`

	if _, err := tx.ExecContext(ctx, query, app.ID, app.ClientName, app.Date, app.Time, app.CreatedAt); err != nil {
		return nil, fmt.Errorf("failed to insert appointment: %w", err)
	}

	if err := tx.Commit(); err != nil {
		return nil, fmt.Errorf("failed to commit transaction: %w", err)
	}

	slog.Info("Creating appointment",
		"client", app.ClientName,
		"date", app.Date,
		"time", app.Time)

	return app, nil
}

func (r *sqliteRepository) Delete(ctx context.Context, id domain.AppointmentID) error {
	res, err := r.db.ExecContext(ctx, "DELETE FROM appointments WHERE id = ?", id.String())
	if err != nil {
		return err
	}
	aff, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if aff == 0 {
		return &gqlerror.Error{
			Message:    "Appointment not found",
			Extensions: map[string]any{"code": "NOT_FOUND"},
		}
	}
	return nil
}

func (r *sqliteRepository) List(ctx context.Context) ([]*domain.Appointment, error) {
	rows, err := r.db.QueryContext(ctx, "SELECT id, client_name, date, time, created_at FROM appointments ORDER BY date DESC, time ASC LIMIT 500")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var appointments []*domain.Appointment

	for rows.Next() {
		var app domain.Appointment

		if err := rows.Scan(&app.ID, &app.ClientName, &app.Date, &app.Time, &app.CreatedAt); err != nil {
			return nil, err
		}

		appointments = append(appointments, &app)
	}

	return appointments, nil
}

func (r *sqliteRepository) GetByDay(ctx context.Context, date string) ([]*domain.Appointment, error) {
	const query = `SELECT id, client_name, date, time, created_at
	               FROM appointments
	               WHERE date = ?
	               ORDER BY time`

	rows, err := r.db.QueryContext(ctx, query, date)
	if err != nil {
		return nil, fmt.Errorf("failed to query appointments for date %s: %w", date, err)
	}
	defer rows.Close()

	var appointments []*domain.Appointment

	for rows.Next() {
		var app domain.Appointment

		if err := rows.Scan(&app.ID, &app.ClientName, &app.Date, &app.Time, &app.CreatedAt); err != nil {
			return nil, fmt.Errorf("failed to scan appointment: %w", err)
		}

		appointments = append(appointments, &app)
	}

	return appointments, nil
}
