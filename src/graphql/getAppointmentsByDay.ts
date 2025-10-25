import { gql } from "@apollo/client";

export const GetAppointmentsByDayDocument = gql`
  query GetAppointmentsByDay($date: String!) {
    appointmentsByDay(date: $date) {
      date
      groups {
        period
        appointments {
          id
          clientName
          time
        }
      }
    }
  }
`;
