import { gql } from "@apollo/client";

export const CreateAppointmentDocument = gql`
  mutation CreateAppointment($input: NewAppointmentInput!) {
    createAppointment(input: $input) {
      id
      clientName
      date
      time
    }
  }
`;
