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
    <aside className="glass-card rounded-2xl p-6 lg:p-8 h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold gradient-text">
            Agendar atendimento
          </h2>
        </div>
      </div>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <DatePicker date={date} setDate={setDate} />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full" />
            Horários disponíveis
          </label>
          {!formattedDate && <LoadingTimeSelect />}
          {formattedDate && loading && <LoadingTimeSelect />}
          {formattedDate && error && (
            <div className="glass rounded-xl p-4 text-center">
              <p className="text-error font-medium">
                Erro ao carregar horários.
              </p>
            </div>
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

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center gap-2" htmlFor="name">
            <span className="w-2 h-2 bg-accent rounded-full" />
            Nome do cliente
          </label>
          <TextInput
            id="name"
            placeholder="Digite o nome completo"
            name="name"
            inputValue={userName}
            setInputValue={setUserName}
            required
          />
        </div>

        <Button
          label="Confirmar agendamento"
          disabled={isDisabled}
          type="submit"
          variant="primary"
        />
      </form>
    </aside>
  );
};

export default Sidebar;
