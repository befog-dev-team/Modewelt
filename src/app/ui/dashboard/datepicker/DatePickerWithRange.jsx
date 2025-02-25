"use client";
import { useState } from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { Calendar } from "../../calendar";
import { cn } from "@/lib/utils";

export function DatePickerWithRange({ className }) {
  const [date, setDate] = useState<DateRange | undefined>(() => ({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  }));

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn(
              "w-[300px] flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-left font-normal",
              !date && "text-gray-500"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={(range) => {
              if (range?.from) {
                setDate(range);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
