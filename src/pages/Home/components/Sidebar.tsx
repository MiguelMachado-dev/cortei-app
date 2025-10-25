import Button from "@/components/Button";
import { DatePicker } from "@/components/DatePicker";
import LoadingTimeSelect from "@/components/LoadingTimeSelect";
import TextInput from "@/components/TextInput";
import TimeSelectGroup from "@/components/TimeSelectGroup";
import {
  useLocalAvailableTimesByDay,
  useLocalCreateAppointment,
} from "@/hooks/useLocalSchedule";
import useSelectedDate from "@/hooks/useSelectedDate";
import { format } from "date-fns";
import { useMemo, useState, type FormEvent } from "react";

const Sidebar = () => {
  const { date, setDate } = useSelectedDate();
  const [value, setValue] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

  const formattedDate = useMemo(
    () => (date ? format(date, "yyyy-MM-dd") : undefined),
    [date],
  );

  const { loading, error, data, refetch } =
    useLocalAvailableTimesByDay(formattedDate);

  const { createAppointment, loading: createAppointmentLoading } =
    useLocalCreateAppointment();

  const timeGroups = data?.groups ?? [];

  const isDisabled = !date || !value || !userName || createAppointmentLoading;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formattedDate || !value) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const clientName = String(formData.get("name") ?? "").trim();

    if (!clientName) {
      return;
    }

    try {
      await createAppointment({
        clientName,
        date: formattedDate,
        time: value,
      });

      await refetch();
      setValue(null);
      setUserName("");
    } catch (mutationError) {
      console.error("Failed to create appointment", mutationError);
    }
  };

  return (
    <aside className="flex w-full flex-col rounded-xl bg-gray-700 p-6 shadow-lg sm:p-8 lg:h-full lg:w-[38%] lg:max-w-[480px] lg:self-stretch lg:p-10 xl:p-12">
      <form className="flex flex-col gap-6 sm:gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-100 sm:text-3xl">
            Agende um atendimento
          </h2>
          <p className="text-sm text-gray-300">
            Selecione data, horário e informe o nome do cliente para criar o
            agendamento
          </p>
        </div>

        <DatePicker date={date} setDate={setDate} />

        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-gray-200">Horários</h2>
          {!formattedDate && <LoadingTimeSelect />}
          {formattedDate && loading && <LoadingTimeSelect />}
          {formattedDate && error && (
            <p className="font-bold text-gray-200">
              Erro ao carregar horários.
            </p>
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

        <div className="flex flex-col gap-2">
          <label className="text-base font-bold text-gray-200" htmlFor="name">
            Cliente
          </label>
          <TextInput
            id="name"
            placeholder="Nome do cliente"
            name="name"
            inputValue={userName}
            setInputValue={setUserName}
            required
          />
        </div>

        <Button label="Agendar" disabled={isDisabled} type="submit" />
      </form>
    </aside>
  );
};

export default Sidebar;
