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
      className={`
        relative cursor-pointer rounded-xl px-4 py-3 text-center transition-all duration-200
        ${checked 
          ? 'bg-gradient-to-r from-primary to-accent text-white border-primary shadow-lg scale-105' 
          : disabled
            ? 'bg-white/5 border-white/10 text-muted-foreground cursor-not-allowed opacity-50'
            : 'bg-white/5 border-white/20 text-foreground hover:bg-white/10 hover:border-white/30 hover:scale-[1.02]'
        }
        backdrop-blur-sm border
      `}
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
      <span className="relative z-10 font-medium">
        {labelText}
      </span>
      {checked && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent opacity-20 animate-pulse-slow" />
      )}
    </label>
  );
};

export default TimeSelect;
