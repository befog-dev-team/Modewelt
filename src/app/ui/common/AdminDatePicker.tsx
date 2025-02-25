"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FiCalendar } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function AdminDatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn(
              "mt-4 sm:mt-0 bg-white shadow-sm rounded-lg p-4 flex items-center space-x-2 cursor-pointer focus:ring-2 focus:ring-gray-300",
              !date && "text-muted-foreground"
            )}
          >
            <div className="text-[#a65386] text-2xl bg-[#ead6ff] rounded-lg p-2">
              <FiCalendar />
            </div>
            <div>
              {date?.from ? (
                <div>
                  <p className="text-gray-600 text-lg">Filter Period</p>
                  <p className="text-gray-800 text-xs font-medium">
                    {format(date.from, "LLL dd, y")} -{" "}
                    {date.to ? format(date.to, "LLL dd, y") : "N/A"}
                  </p>
                </div>
              ) : (
                <span>Pick a date</span>
              )}
            </div>
            <div className="text-[#b9babd] text-2xl">
              {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" style={{ zIndex: 1000 }}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}