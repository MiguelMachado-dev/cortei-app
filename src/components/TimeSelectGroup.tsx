import type { AvailableTimeGroup, TimeOfDay } from "@/lib/localSchedule";
import TimeSelect from "./TimeSelect";

export type Items = AvailableTimeGroup[];

interface TimeSelectGroupProps {
  name: string;
  timeGroups: Items;
  value: string | null;
  onChange: (event: string) => void;
  selectedDate?: Date;
}

const periodMap: Record<TimeOfDay, string> = {
  MORNING: "Manhã",
  AFTERNOON: "Tarde",
  EVENING: "Noite",
};

const TimeSelectGroup = ({
  name,
  timeGroups,
  value,
  onChange,
  selectedDate,
}: TimeSelectGroupProps) => {
  return (
    <div className="flex flex-col gap-3">
      {timeGroups &&
        timeGroups.map((group) => (
          <div key={group.period}>
            <h3 className="mb-2 text-sm leading-none font-normal text-gray-300">
              {periodMap[group.period] || group.period}
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {group.times.map((timeSlot) => (
                <TimeSelect
                  key={timeSlot.time}
                  name={name}
                  value={timeSlot.time}
                  id={name + timeSlot.time}
                  checked={value === timeSlot.time}
                  onChange={(e) => onChange(e.target.value)}
                  labelText={timeSlot.time}
                  isDisabled={!timeSlot.isAvailable}
                  selectedDate={selectedDate}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default TimeSelectGroup;
