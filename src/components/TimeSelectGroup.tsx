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
    <div className="space-y-6">
      {timeGroups &&
        timeGroups.map((group) => (
          <div key={group.period} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                {periodMap[group.period] || group.period}
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
