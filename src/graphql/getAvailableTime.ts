import { gql } from "@apollo/client";

export const GetAvailableTimeDocument = gql`
  query GetAvailableTime($date: String!) {
    availableTimesByDay(date: $date) {
      groups {
        period
        times {
          time
          isAvailable
        }
      }
    }
  }
`;
