import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="date" className="text-base font-bold text-gray-200">
        Data
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            id="date"
            className="w-48 items-center justify-between border border-gray-500 font-normal text-gray-300"
          >
            <div className="flex items-center gap-2 text-[color:var(--yellow)]">
              <CalendarIcon width={16} height={16} />
              <p className="self-baseline-last text-sm leading-none text-gray-200">
                {date ? date.toLocaleDateString() : "selecione uma data"}
              </p>
            </div>
            <ChevronDownIcon width={16} height={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0 bg-gray-600 border-gray-500" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            disabled={{ before: today }}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
