package service

import (
	"context"
	"cortei-server/internal/domain"
)

type AppointmentRepository interface {
	Delete(ctx context.Context, id domain.AppointmentID) error
}

type AppointmentService struct {
	Repo AppointmentRepository
}

func (s *AppointmentService) Delete(ctx context.Context, id domain.AppointmentID) error {
	return s.Repo.Delete(ctx, id)
}
