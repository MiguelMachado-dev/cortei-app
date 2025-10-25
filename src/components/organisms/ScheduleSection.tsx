import type { AppointmentGroup, TimeOfDay } from "@/lib/localSchedule";
import {
  CloudSunIcon,
  MoonStarsIcon,
  SunHorizonIcon,
} from "@phosphor-icons/react";
import type { JSX } from "react";

interface ScheduleSectionProps {
  groups: AppointmentGroup[];
}

const ScheduleSection = ({ groups }: ScheduleSectionProps) => {
  const dictionary: Record<TimeOfDay, string> = {
    MORNING: "Manhã",
    AFTERNOON: "Tarde",
    EVENING: "Noite",
  };

  const timeRange: Record<TimeOfDay, string> = {
    MORNING: "09h-12h",
    AFTERNOON: "13h-18h",
    EVENING: "19h-21h",
  };

  const timeIcon: Record<TimeOfDay, JSX.Element> = {
    MORNING: <SunHorizonIcon size={20} />,
    AFTERNOON: <CloudSunIcon size={20} />,
    EVENING: <MoonStarsIcon size={20} />,
  };

  return (
    <div className="mt-10">
      {groups.length === 0 ? (
        <p className="text-sm text-gray-300">
          Nenhum agendamento para este dia.
        </p>
      ) : (
        <div className="flex flex-col gap-6 2xl:grid 2xl:grid-cols-3 2xl:gap-6">
          {groups.map((group) => (
            <div
              key={group.period}
              className="rounded-lg border border-gray-600"
            >
              <div className="flex justify-between border-b border-gray-600 px-5 py-3">
                <h3 className="flex items-center text-sm font-bold text-[color:var(--yellow)]">
                  {timeIcon[group.period]}
                  <span className="ml-3 translate-y-[2px] leading-none text-gray-300">
                    {dictionary[group.period] ?? group.period}
                  </span>
                </h3>

                <p className="text-sm text-gray-400">
                  {timeRange[group.period]}
                </p>
              </div>

              {group.appointments.length === 0 ? (
                <div className="flex flex-1 items-center justify-center px-5 py-6">
                  <p className="text-sm text-gray-300">
                    Sem agendamentos neste período.
                  </p>
                </div>
              ) : (
                <ul className="px-5 py-6">
                  {group.appointments.map((appointment) => (
                    <li
                      key={appointment.id}
                      className="flex items-center gap-5 px-3 py-2 text-sm text-gray-100"
                    >
                      <span className="text-base font-bold text-gray-200">
                        {appointment.time}
                      </span>
                      <span className="font-base text-gray-200">
                        {appointment.clientName}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleSection;
