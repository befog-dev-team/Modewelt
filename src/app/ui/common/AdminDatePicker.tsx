"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AdminDatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date-picker"
            className={cn(
              "w-[260px] justify-between bg-[#ffffff] hover:bg-[#ffffff] text-left font-normal border border-gray-300 rounded-md px-4 py-2",
              !date && "text-[#1f2a38]"
            )}
            aria-label="Select date range"
          >
            <div className="flex items-center gap-2 text-[#1f2a38]">
              <CalendarIcon className="w-5 h-5 text-[#1f2a38]" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </div>
            {date && (
              <X
                className="w-4 h-4 text-[#1f2a38] hover:text-red-500 cursor-pointer"
                onClick={() => setDate(undefined)}
                aria-label="Clear date selection"
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 text-[#1f2a38]" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
