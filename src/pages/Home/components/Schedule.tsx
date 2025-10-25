import { DatePicker } from "@/components/DatePicker";
import ScheduleSection from "@/components/organisms/ScheduleSection";
import { useGetAppointmentsByDayQuery } from "@/graphql/__generated__/types";
import useSelectedDate from "@/hooks/useSelectedDate";
import { format } from "date-fns";
import { useMemo } from "react";

const Schedule = () => {
  const { date, setDate } = useSelectedDate();

  const formattedDate = useMemo(
    () => (date ? format(date, "yyyy-MM-dd") : undefined),
    [date],
  );

  const { loading, error, data } = useGetAppointmentsByDayQuery({
    variables: { date: formattedDate ?? "" },
    skip: !formattedDate,
  });

  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-28 py-20 2xl:mx-0 2xl:max-w-none 2xl:px-32">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Sua agenda</h2>
          <p className="text-sm text-gray-300">
            Consulte os seus cortes de cabelo agendados por dia
          </p>
        </div>
        <DatePicker date={date} setDate={setDate} hideLabel />
      </div>

      <div>
        {loading && <p>Carregando...</p>}
        {error && <p>Erro ao listar horários agendados...</p>}
        {data && !error && !loading && (
          <ScheduleSection groups={data?.appointmentsByDay?.groups ?? []} />
        )}
      </div>
    </section>
  );
};

export default Schedule;
