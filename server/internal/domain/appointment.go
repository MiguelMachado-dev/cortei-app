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
	eveningEndHour     = 22
)

const (
	BusinessOpeningHour = morningStartHour
	BusinessClosingHour = eveningEndHour - 1
)

type AppointmentGroup struct {
	Period       TimeOfDay     `json:"period"`
	Appointments []Appointment `json:"appointments"`
}

type DailyAppointments struct {
	Date   string             `json:"date"`
	Groups []AppointmentGroup `json:"groups"`
}

type TimeSlot struct {
	Time        string  `json:"time"`
	IsAvailable bool    `json:"isAvailable"`
	ClientName  *string `json:"clientName,omitempty"`
}

type AvailableTimeGroup struct {
	Period TimeOfDay  `json:"period"`
	Times  []TimeSlot `json:"times"`
}

type AvailableTimes struct {
	Date   string               `json:"date"`
	Groups []AvailableTimeGroup `json:"groups"`
}

// AvailableTimesFlat represents the flat version of available times (for internal use)
type AvailableTimesFlat struct {
	Date  string     `json:"date"`
	Times []TimeSlot `json:"times"`
}

var defaultDailyTimeSlots = func() []string {
	slots := make([]string, 0, eveningEndHour-morningStartHour)
	start := time.Date(2000, time.January, 1, morningStartHour, 0, 0, 0, time.UTC)

	for start.Hour() < eveningEndHour {
		slots = append(slots, start.Format("15:04"))
		start = start.Add(time.Hour)
	}

	return slots
}()

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
		return "", fmt.Errorf("time %s is outside business hours (%02d:00-%02d:00)", timeStr, BusinessOpeningHour, BusinessClosingHour)
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

// calculateAvailableTimesFlat calculates available time slots in flat format
func calculateAvailableTimesFlat(date string, appointments []Appointment) AvailableTimesFlat {
	// Create a map of time to appointment details
	occupied := make(map[string]Appointment, len(appointments))

	for _, appointment := range appointments {
		occupied[appointment.Time] = appointment
	}

	slots := make([]TimeSlot, 0, len(defaultDailyTimeSlots))

	for _, slot := range defaultDailyTimeSlots {
		appointment, taken := occupied[slot]
		if taken {
			slots = append(slots, TimeSlot{
				Time:        slot,
				IsAvailable: false,
				ClientName:  &appointment.ClientName,
			})
		} else {
			slots = append(slots, TimeSlot{
				Time:        slot,
				IsAvailable: true,
			})
		}
	}

	return AvailableTimesFlat{
		Date:  date,
		Times: slots,
	}
}

// CalculateAvailableTimes calculates available time slots (legacy function for backward compatibility)
func CalculateAvailableTimes(date string, appointments []Appointment) AvailableTimesFlat {
	return calculateAvailableTimesFlat(date, appointments)
}

// GroupAvailableTimesByDay returns available times grouped by time periods
func GroupAvailableTimesByDay(date string, appointments []Appointment) AvailableTimes {
	// Calculate all available time slots
	availableTimes := calculateAvailableTimesFlat(date, appointments)

	// Use a map for O(1) group lookup
	groupMap := map[TimeOfDay][]TimeSlot{
		Morning:   {},
		Afternoon: {},
		Evening:   {},
	}

	// Group available time slots by time period
	for _, slot := range availableTimes.Times {
		period, err := GetTimeOfDay(slot.Time)
		if err != nil {
			// Skip times outside business hours
			continue
		}
		groupMap[period] = append(groupMap[period], slot)
	}

	// Build groups slice from map
	groups := []AvailableTimeGroup{
		{Period: Morning, Times: groupMap[Morning]},
		{Period: Afternoon, Times: groupMap[Afternoon]},
		{Period: Evening, Times: groupMap[Evening]},
	}

	return AvailableTimes{
		Date:   date,
		Groups: groups,
	}
}
