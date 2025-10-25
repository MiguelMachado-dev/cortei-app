import Button from "@/components/Button";
import { DatePicker } from "@/components/DatePicker";
import LoadingTimeSelect from "@/components/LoadingTimeSelect";
import TextInput from "@/components/TextInput";
import TimeSelectGroup from "@/components/TimeSelectGroup";
import {
  useCreateAppointmentMutation,
  useGetAvailableTimeQuery,
  type GetAvailableTimeQuery,
} from "@/graphql/__generated__/types";
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

  const { loading, error, data, refetch } = useGetAvailableTimeQuery({
    variables: { date: formattedDate ?? "" },
    skip: !formattedDate,
  });

  const [createAppointment, { loading: createAppointmentLoading }] =
    useCreateAppointmentMutation();

  const timeGroups = (data?.availableTimesByDay?.groups ??
    []) as GetAvailableTimeQuery["availableTimesByDay"]["groups"];

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
        variables: {
          input: {
            clientName,
            date: formattedDate,
            time: value,
          },
        },
      });

      await refetch({ date: formattedDate });
      setValue(null);
      setUserName("");
    } catch (mutationError) {
      console.error("Failed to create appointment", mutationError);
    }
  };

  return (
    <aside className="flex h-full w-[35%] max-w-[500px] rounded-lg bg-gray-700 p-20">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
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
