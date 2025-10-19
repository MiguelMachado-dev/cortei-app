package domain

import (
	"github.com/google/uuid"
)

type AppointmentID = uuid.UUID

func ParseAppointmentID(s string) (AppointmentID, error) {
	return uuid.Parse(s)
}
