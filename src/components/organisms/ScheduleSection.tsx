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
    <div className="space-y-8">
      {groups.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent/20 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Nenhum agendamento para este dia
          </h3>
          <p className="text-muted-foreground">
            A agenda está livre para o dia selecionado
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.period}
              className="glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
            >
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center text-white">
                      {timeIcon[group.period]}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {dictionary[group.period] ?? group.period}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {timeRange[group.period]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {group.appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-white/5 rounded-xl mx-auto mb-3 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white/20 rounded" />
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Sem agendamentos neste período
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {group.appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform duration-200" />
                            <div>
                              <p className="font-medium text-foreground">
                                {appointment.clientName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {appointment.time}
                              </p>
                            </div>
                          </div>
                          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent/20 rounded-lg flex items-center justify-center group-hover:from-primary group-hover:to-accent transition-all duration-200">
                            <div className="w-4 h-4 bg-gradient-to-r from-primary to-accent rounded" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleSection;
