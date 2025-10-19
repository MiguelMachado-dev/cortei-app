package domain

import (
	"fmt"
	"time"
)

type Appointment struct {
	ID         string    `json:"id"`
	ClientName string    `json:"clientName"`
	Date       string    `json:"date"`
	Time       string    `json:"time"`
	CreatedAt  time.Time `json:"createdAt"`
}

type NewAppointment struct {
	ClientName string `json:"clientName"`
	Date       string `json:"date"`
	Time       string `json:"time"`
}

type TimeOfDay string

const (
	Morning   TimeOfDay = "MORNING"
	Afternoon TimeOfDay = "AFTERNOON"
	Evening   TimeOfDay = "EVENING"
)

const (
	morningStartHour   = 9
	afternoonStartHour = 13
	eveningStartHour   = 19
	eveningEndHour     = 21
)

type AppointmentGroup struct {
	Period       TimeOfDay     `json:"period"`
	Appointments []Appointment `json:"appointments"`
}

type DailyAppointments struct {
	Date   string             `json:"date"`
	Groups []AppointmentGroup `json:"groups"`
}

// GetTimeOfDay determines the time period based on the hour
func GetTimeOfDay(timeStr string) (TimeOfDay, error) {
	parsedTime, err := time.Parse("15:04", timeStr)
	if err != nil {
		return "", err // return zero value for TimeOfDay on error
	}

	hour := parsedTime.Hour()

	switch {
	case hour >= morningStartHour && hour < afternoonStartHour:
		return Morning, nil
	case hour >= afternoonStartHour && hour < eveningStartHour:
		return Afternoon, nil
	case hour >= eveningStartHour && hour < eveningEndHour:
		return Evening, nil
	default:
		return "", fmt.Errorf("time %s is outside business hours (09:00-21:00)", timeStr)
	}
}

// GroupAppointmentsByDay groups appointments by time periods
func GroupAppointmentsByDay(date string, appointments []Appointment) DailyAppointments {
	// Use a map for O(1) group lookup
	groupMap := map[TimeOfDay][]Appointment{
		Morning:   {},
		Afternoon: {},
		Evening:   {},
	}

	// Group appointments by time period
	for _, appointment := range appointments {
		period, err := GetTimeOfDay(appointment.Time)
		if err != nil {
			// Optionally log the error, skip, or handle as needed
			// For example, continue to next appointment
			continue
		}
		groupMap[period] = append(groupMap[period], appointment)
	}

	// Build groups slice from map
	groups := []AppointmentGroup{
		{Period: Morning, Appointments: groupMap[Morning]},
		{Period: Afternoon, Appointments: groupMap[Afternoon]},
		{Period: Evening, Appointments: groupMap[Evening]},
	}

	return DailyAppointments{
		Date:   date,
		Groups: groups,
	}
}
