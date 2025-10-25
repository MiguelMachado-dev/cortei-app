import type { ChangeEvent } from "react";

interface TimeSelectProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  labelText: string;
  isDisabled: boolean;
  selectedDate?: Date;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TimeSelect = ({
  id,
  name,
  value,
  checked,
  labelText,
  isDisabled,
  selectedDate,
  onChange,
}: TimeSelectProps) => {
  const isToday =
    selectedDate && selectedDate.toDateString() === new Date().toDateString();

  let hasTimePassed = false;

  if (isToday) {
    const [hoursString, minutesString = "0"] = value.split(":");
    const hours = Number(hoursString);
    const minutes = Number(minutesString);

    if (!Number.isNaN(hours) && !Number.isNaN(minutes)) {
      const slotDate = new Date(selectedDate);
      slotDate.setHours(hours, minutes, 0, 0);
      hasTimePassed = slotDate.getTime() <= Date.now();
    }
  }

  const disabled = isDisabled || hasTimePassed;

  return (
    <label
      data-checked={checked}
      aria-disabled={disabled}
      title={
        disabled ? "Horário indisponível" : `Selecionar horário ${labelText}`
      }
      className={
        "cursor-pointer rounded-lg border border-gray-500 bg-gray-600 px-5 py-2 text-center transition-colors hover:bg-gray-500 aria-disabled:cursor-auto aria-disabled:border-gray-600 aria-disabled:bg-transparent data-[checked=true]:border-[color:var(--yellow)]"
      }
    >
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
        disabled={disabled}
      />
      <span
        className={[
          "text-base",
          checked
            ? "text-[color:var(--yellow)]"
            : disabled
              ? "text-gray-500"
              : "text-gray-200",
        ].join(" ")}
      >
        {labelText}
      </span>
    </label>
  );
};

export default TimeSelect;
