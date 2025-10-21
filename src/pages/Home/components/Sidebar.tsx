import { DatePickerDemo } from "@/components/DatePicker";
import LoadingSidebar from "@/components/LoadingSidebar";
import TimeSelectGroup, { type Items } from "@/components/TimeSelectGroup";
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

  const availableTimes = (data?.availableTimesByDay?.times ??
    []) as GetAvailableTimeQuery["availableTimesByDay"]["times"];

  const items: Items = availableTimes.map(({ time, isAvailable }) => ({
    label: time,
    value: time,
    isDisabled: !isAvailable,
  }));

  if (loading) {
    return <LoadingSidebar />;
  }

  return (
    <aside className="bg-gray-700">
      <div>
        <h2>Agende um atendimento</h2>
        <p>
          Selecione data, horário e informe o nome do cliente para criar o
          agendamento
        </p>
      </div>

      <div>
        <label>Data</label>
        <DatePickerDemo date={date} setDate={setDate} />
      </div>

      <div>
        <h3>Horários</h3>
        {!formattedDate && <p>Selecione uma data.</p>}
        {formattedDate && loading && <p>Carregando horários...</p>}
        {formattedDate && error && <p>Erro ao carregar horários.</p>}
        {formattedDate && !loading && !error && (
          <TimeSelectGroup
            items={items}
            value={value}
            onChange={setValue}
            name="time"
          />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
