package repository

import (
	"context"
	"cortei-server/internal/domain"
	"database/sql"
	"log"
	"time"

	"github.com/google/uuid"
	_ "github.com/mattn/go-sqlite3"
)

// Our repository contract
type AppointmentRepository interface {
	Create(ctx context.Context, appointment *domain.Appointment) (*domain.Appointment, error)
	Delete(ctx context.Context, id string) error
	List(ctx context.Context) ([]*domain.Appointment, error)
}

type sqliteRepository struct {
	db *sql.DB
}

func NewSQLiteRepository(db *sql.DB) AppointmentRepository {
	return &sqliteRepository{
		db: db,
	}
}

func InitDB(filepath string) *sql.DB {
	db, err := sql.Open("sqlite3", filepath)
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
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

	log.Println("Table 'appointments' created or already exists.")
	return db
}

func (r *sqliteRepository) Create(ctx context.Context, app *domain.Appointment) (*domain.Appointment, error) {
	app.ID = uuid.NewString()
	app.CreatedAt = time.Now()

	_, err := r.db.ExecContext(ctx, "INSERT INTO appointments (id, client_name, date, time, created_at) VALUES (?, ?, ?, ?, ?)",
		app.ID, app.ClientName, app.Date, app.Time, app.CreatedAt)

	if err != nil {
		return nil, err
	}

	return app, nil
}

func (r *sqliteRepository) Delete(ctx context.Context, id string) error {
	_, err := r.db.ExecContext(ctx, "DELETE FROM appointments WHERE id = ?", id)
	return err
}

func (r *sqliteRepository) List(ctx context.Context) ([]*domain.Appointment, error) {
	rows, err := r.db.QueryContext(ctx, "SELECT id, client_name, date, time, created_at FROM appointments")
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
