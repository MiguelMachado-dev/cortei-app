import { DatePicker } from "@/components/DatePicker";
import ScheduleSection from "@/components/organisms/ScheduleSection";
import { useLocalAppointmentsByDay } from "@/hooks/useLocalSchedule";
import useSelectedDate from "@/hooks/useSelectedDate";
import { format } from "date-fns";
import { useMemo } from "react";

const Schedule = () => {
  const { date, setDate } = useSelectedDate();

  const formattedDate = useMemo(
    () => (date ? format(date, "yyyy-MM-dd") : undefined),
    [date],
  );

  const { loading, error, data } = useLocalAppointmentsByDay(formattedDate);

  return (
    <section className="flex w-full flex-1 flex-col">
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden sm:block w-1 h-12 bg-gradient-to-b from-primary to-accent rounded-full" />
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold gradient-text">
                Sua agenda
              </h2>
              <p className="text-muted-foreground mt-2">
                Consulte os seus cortes de cabelo agendados por dia
              </p>
            </div>
          </div>
          <div className="w-full sm:w-auto max-w-[280px]">
            <DatePicker date={date} setDate={setDate} hideLabel />
          </div>
        </div>
      </div>

      <div className="flex-1">
        {loading && (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="animate-pulse-slow">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground">Carregando agenda...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-error/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 bg-error rounded" />
            </div>
            <p className="text-error font-medium">
              Erro ao listar horários agendados...
            </p>
          </div>
        )}
        {data && !error && !loading && (
          <ScheduleSection groups={data.groups ?? []} />
        )}
      </div>
    </section>
  );
};

export default Schedule;
