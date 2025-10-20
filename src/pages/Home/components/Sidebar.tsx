import { DatePickerDemo } from "@/components/DatePicker";
import TimeSelectGroup, { type Items } from "@/components/TimeSelectGroup";
import { GET_AVAILABLE_TIME } from "@/graphql/queries";
import { useQuery } from "@apollo/client/react";
import { format } from "date-fns";
import { useMemo, useState } from "react";

type TimeSlot = {
  time: string;
  isAvailable: boolean;
};

type AvailableTimesData = {
  availableTimesByDay: {
    date: string;
    times: TimeSlot[];
  };
};

type AvailableTimesVars = {
  date: string;
};

const Sidebar = () => {
  const [date, setDate] = useState<Date>();
  const [value, setValue] = useState<string | null>(null);

  const formattedDate = useMemo(
    () => (date ? format(date, "yyyy-MM-dd") : undefined),
    [date],
  );

  const { loading, error, data } = useQuery<
    AvailableTimesData,
    AvailableTimesVars
  >(GET_AVAILABLE_TIME, {
    variables: { date: formattedDate ?? "" },
    skip: !formattedDate,
  });

  const availableTimes: TimeSlot[] = data?.availableTimesByDay?.times ?? [];

  const items: Items = availableTimes.map(({ time, isAvailable }) => ({
    label: time,
    value: time,
    isDisabled: !isAvailable,
  }));

  console.log(items);

  return (
    <aside>
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
