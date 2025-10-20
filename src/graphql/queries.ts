import { gql } from "@apollo/client";

export const GET_AVAILABLE_TIME = gql`
  query GetAvailableTime($date: String!) {
    availableTimesByDay(date: $date) {
      date
      times {
        time
        isAvailable
      }
    }
  }
`;
