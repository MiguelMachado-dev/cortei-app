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

type InvalidPeriodEntry struct {
	Time   string
	Source string
	Reason string
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

func describeAppointment(app Appointment) string {
	if app.ID != "" {
		return fmt.Sprintf("appointment:%s", app.ID)
	}
	if app.ClientName != "" {
		return fmt.Sprintf("appointment for %s", app.ClientName)
	}
	return "appointment"
}

func describeTimeSlot(slot TimeSlot) string {
	if slot.ClientName != nil && *slot.ClientName != "" {
		return fmt.Sprintf("slot held by %s", *slot.ClientName)
	}
	return "available time slot"
}

type periodGrouping[T any] struct {
	groups  map[TimeOfDay][]T
	invalid []InvalidPeriodEntry
}

func partitionByPeriod[T any](items []T, extractTime func(T) string, describe func(T) string) periodGrouping[T] {
	grouping := periodGrouping[T]{
		groups: map[TimeOfDay][]T{
			Morning:   {},
			Afternoon: {},
			Evening:   {},
		},
		invalid: make([]InvalidPeriodEntry, 0),
	}

	for _, item := range items {
		timeValue := extractTime(item)
		period, err := GetTimeOfDay(timeValue)
		if err != nil {
			grouping.invalid = append(grouping.invalid, InvalidPeriodEntry{
				Time:   timeValue,
				Source: describe(item),
				Reason: err.Error(),
			})
			continue
		}
		grouping.groups[period] = append(grouping.groups[period], item)
	}

	return grouping
}

var periodOrder = []TimeOfDay{Morning, Afternoon, Evening}

// GroupAppointmentsByDay groups appointments by time periods and reports invalid entries
func GroupAppointmentsByDay(date string, appointments []Appointment) (DailyAppointments, []InvalidPeriodEntry) {
	grouping := partitionByPeriod(appointments, func(app Appointment) string {
		return app.Time
	}, describeAppointment)
	groupMap := grouping.groups

	// Build groups slice from map
	groups := []AppointmentGroup{
		{Period: Morning, Appointments: groupMap[Morning]},
		{Period: Afternoon, Appointments: groupMap[Afternoon]},
		{Period: Evening, Appointments: groupMap[Evening]},
	}

	return DailyAppointments{
		Date:   date,
		Groups: groups,
	}, grouping.invalid
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
func GroupAvailableTimesByDay(date string, appointments []Appointment) (AvailableTimes, []InvalidPeriodEntry) {
	appointmentGrouping := partitionByPeriod(appointments, func(app Appointment) string {
		return app.Time
	}, describeAppointment)
	validAppointments := make([]Appointment, 0, len(appointments)-len(appointmentGrouping.invalid))
	for _, period := range periodOrder {
		validAppointments = append(validAppointments, appointmentGrouping.groups[period]...)
	}

	// Calculate all available time slots
	availableTimes := calculateAvailableTimesFlat(date, validAppointments)

	slotGrouping := partitionByPeriod(availableTimes.Times, func(slot TimeSlot) string {
		return slot.Time
	}, describeTimeSlot)
	groupMap := slotGrouping.groups

	invalid := append(appointmentGrouping.invalid, slotGrouping.invalid...)

	// Build groups slice from map
	groups := []AvailableTimeGroup{
		{Period: Morning, Times: groupMap[Morning]},
		{Period: Afternoon, Times: groupMap[Afternoon]},
		{Period: Evening, Times: groupMap[Evening]},
	}

	return AvailableTimes{
		Date:   date,
		Groups: groups,
	}, invalid
}
