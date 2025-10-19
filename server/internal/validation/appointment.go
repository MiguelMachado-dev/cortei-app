package validation

import (
	"cortei-server/internal/domain"
	apperrors "cortei-server/internal/errors"
	"strings"
	"time"
)

func ValidateNewAppointmentInput(input domain.NewAppointment) error {
	if strings.TrimSpace(input.ClientName) == "" {
		return &apperrors.ValidationError{Field: "clientName", Message: "cannot be empty"}
	}

	// Validação de data
	if _, err := time.Parse("2006-01-02", input.Date); err != nil {
		return &apperrors.ValidationError{Field: "date", Message: "must be in YYYY-MM-DD format"}
	}

	// Validação de hora
	if _, err := time.Parse("15:04", input.Time); err != nil {
		return &apperrors.ValidationError{Field: "time", Message: "must be in HH:MM format"}
	}

	appointmentTime, err := time.Parse("2006-01-02 15:04", input.Date+" "+input.Time)
	if err != nil {
		return &apperrors.ValidationError{Field: "dateTime", Message: "invalid datetime format"}
	}

	if appointmentTime.Before(time.Now()) {
		return &apperrors.ValidationError{Field: "dateTime", Message: "appointment cannot be in the past"}
	}

	return nil
}
