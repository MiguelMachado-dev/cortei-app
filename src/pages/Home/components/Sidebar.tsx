import { DatePicker } from "@/components/DatePicker";
import LoadingTimeSelect from "@/components/LoadingTimeSelect";
import TimeSelectGroup from "@/components/TimeSelectGroup";
import {
  useGetAvailableTimeQuery,
  type GetAvailableTimeQuery,
} from "@/graphql/__generated__/types";
import { format } from "date-fns";
import { useMemo, useState } from "react";

const Sidebar = () => {
  const [date, setDate] = useState<Date>();
  const [value, setValue] = useState<string | null>(null);

  const formattedDate = useMemo(
    () => (date ? format(date, "yyyy-MM-dd") : undefined),
    [date],
  );

  const { loading, error, data } = useGetAvailableTimeQuery({
    variables: { date: formattedDate ?? "" },
    skip: !formattedDate,
  });

  const timeGroups = (data?.availableTimesByDay?.groups ??
    []) as GetAvailableTimeQuery["availableTimesByDay"]["groups"];

  return (
    <aside className="flex h-full w-[35%] max-w-[500px] flex-col gap-6 rounded-lg bg-gray-700 p-20">
      <div>
        <h2 className="text-3xl font-bold text-gray-100">
          Agende um atendimento
        </h2>
        <p className="text-sm text-gray-300">
          Selecione data, horário e informe o nome do cliente para criar o
          agendamento
        </p>
      </div>

      <div>
        <DatePicker date={date} setDate={setDate} />
      </div>

      <div>
        <h2 className="mb-2 text-base font-bold text-gray-200">Horários</h2>
        {!formattedDate && <LoadingTimeSelect />}
        {formattedDate && loading && <LoadingTimeSelect />}
        {formattedDate && error && (
          <p className="font-bold text-gray-200">Erro ao carregar horários.</p>
        )}
        {formattedDate && !loading && !error && (
          <TimeSelectGroup
            timeGroups={timeGroups}
            value={value}
            onChange={setValue}
            name="time"
            selectedDate={date}
          />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
