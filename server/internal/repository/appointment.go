package repository

import (
	"context"
	"cortei-server/internal/domain"
	"fmt"
	"sync"
	"time"

	"github.com/google/uuid"
)

// Our repository contract
type AppointmentRepository interface {
	Create(ctx context.Context, appointment *domain.Appointment) (*domain.Appointment, error)
	Delete(ctx context.Context, id string) error
	List(ctx context.Context) ([]*domain.Appointment, error)
}

// In-memory implementation
type inMemoryAppointmentRepository struct {
	mu           sync.RWMutex
	appointments map[string]*domain.Appointment
}

func NewInMemoryAppointmentRepository() AppointmentRepository {
	return &inMemoryAppointmentRepository{
		appointments: make(map[string]*domain.Appointment),
	}
}

func (r *inMemoryAppointmentRepository) Create(ctx context.Context, app *domain.Appointment) (*domain.Appointment, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	app.ID = uuid.NewString()
	app.CreatedAt = time.Now()
	r.appointments[app.ID] = app

	return app, nil
}

func (r *inMemoryAppointmentRepository) Delete(ctx context.Context, id string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, ok := r.appointments[id]; !ok {
		return fmt.Errorf("agendamento com ID %s não encontrado", id)
	}
	delete(r.appointments, id)
	return nil
}

func (r *inMemoryAppointmentRepository) List(ctx context.Context) ([]*domain.Appointment, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	list := make([]*domain.Appointment, 0, len(r.appointments))
	for _, app := range r.appointments {
		list = append(list, app)
	}
	return list, nil
}
