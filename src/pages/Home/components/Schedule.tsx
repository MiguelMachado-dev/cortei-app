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
    <section className="flex w-full flex-1 flex-col rounded-xl bg-gray-700/40 px-4 py-8 sm:px-8 sm:py-10 lg:mx-auto lg:max-w-[1200px] lg:rounded-none lg:bg-transparent lg:px-16 lg:py-12 xl:px-20 2xl:mx-0 2xl:max-w-none 2xl:px-32">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Sua agenda</h2>
          <p className="text-sm text-gray-300">
            Consulte os seus cortes de cabelo agendados por dia
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <DatePicker date={date} setDate={setDate} hideLabel />
        </div>
      </div>

      <div>
        {loading && <p>Carregando...</p>}
        {error && <p>Erro ao listar horários agendados...</p>}
        {data && !error && !loading && (
          <ScheduleSection groups={data.groups ?? []} />
        )}
      </div>
    </section>
  );
};

export default Schedule;
