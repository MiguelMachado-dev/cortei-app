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
  hideLabel?: boolean;
}

export function DatePicker({
  date,
  setDate,
  hideLabel = false,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex flex-col gap-2">
      {!hideLabel && (
        <Label htmlFor="date" className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Data
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            id="date"
            className="h-12 w-full items-center justify-between glass text-foreground hover:bg-white/10 border border-white/20"
          >
            <div className="flex items-center gap-2 text-accent">
              <CalendarIcon width={16} height={16} />
              <p className="self-baseline-last text-sm leading-none text-foreground">
                {date ? date.toLocaleDateString() : "selecione uma data"}
              </p>
            </div>
            <ChevronDownIcon width={16} height={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden glass-card p-0"
          align="start"
        >
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
