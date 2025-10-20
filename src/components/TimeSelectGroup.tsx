import TimeSelect from "./TimeSelect";

export type Items = Array<{
  value: string;
  label: string;
  isDisabled: boolean;
}>;

interface TimeSelectGroupProps {
  name: string;
  items: Items;
  value: string | null;
  onChange: (event: string) => void;
}

const TimeSelectGroup = ({
  name,
  items,
  value,
  onChange,
}: TimeSelectGroupProps) => {
  return (
    <div className="flex flex-row gap-2">
      {items &&
        items.map((item) => (
          <TimeSelect
            key={item.value}
            name={name}
            value={item.value}
            id={name + item.value}
            checked={value === item.value}
            onChange={(e) => onChange(e.target.value)}
            labelText={item.label}
            isDisabled={item.isDisabled}
          />
        ))}
    </div>
  );
};

export default TimeSelectGroup;
