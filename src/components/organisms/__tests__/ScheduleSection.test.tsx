import { render, screen } from "@testing-library/react";
import { TimeOfDay } from "@/graphql/__generated__/types";
import { describe, expect, it } from "vitest";

import ScheduleSection from "../ScheduleSection";

type Appointment = {
  __typename?: "Appointment";
  id: string;
  clientName: string;
  time: string;
};

type Group = {
  __typename?: "AppointmentGroup";
  period: TimeOfDay;
  appointments: Appointment[];
};

describe("ScheduleSection", () => {
  it("shows an empty state when there are no appointments", () => {
    render(<ScheduleSection groups={[]} />);

    expect(
      screen.getByText("Nenhum agendamento para este dia."),
    ).toBeInTheDocument();
  });

  it("renders each period with its appointments and fallback text", () => {
    const groups: Group[] = [
      {
        __typename: "AppointmentGroup",
        period: TimeOfDay.Morning,
        appointments: [
          {
            __typename: "Appointment",
            id: "1",
            time: "09:00",
            clientName: "Ana",
          },
          {
            __typename: "Appointment",
            id: "2",
            time: "09:30",
            clientName: "Bruno",
          },
        ],
      },
      {
        __typename: "AppointmentGroup",
        period: TimeOfDay.Afternoon,
        appointments: [],
      },
    ];

    render(<ScheduleSection groups={groups} />);

    expect(screen.getByText("Manhã")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("Ana")).toBeInTheDocument();

    expect(screen.getByText("Tarde")).toBeInTheDocument();
    expect(
      screen.getByText("Sem agendamentos neste período."),
    ).toBeInTheDocument();
  });
});
