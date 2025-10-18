package domain

import "time"

type Appointment struct {
	ID         string    `json:"id"`
	ClientName string    `json:"clientName"`
	Date       string    `json:"date"`
	Time       string    `json:"time"`
	CreatedAt  time.Time `json:"createdAt"`
}
