import type { ChangeEvent } from "react";

interface TimeSelectProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  labelText: string;
  isDisabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TimeSelect = ({
  id,
  name,
  value,
  checked,
  labelText,
  isDisabled,
  onChange,
}: TimeSelectProps) => {
  return (
    <label
      aria-checked={checked}
      aria-disabled={isDisabled}
      className={
        "cursor-pointer rounded-lg border border-gray-500 bg-gray-600 px-5 py-2 transition-colors hover:bg-gray-500 aria-checked:border-[color:var(--yellow)] aria-disabled:cursor-auto aria-disabled:border-gray-600 aria-disabled:bg-transparent"
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
        disabled={isDisabled}
      />
      <span
        className={[
          "text-base",
          checked
            ? "text-[color:var(--yellow)]"
            : isDisabled
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
