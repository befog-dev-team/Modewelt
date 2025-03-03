import * as React from "react";
import { format } from "date-fns";
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
import { RxCross2 } from "react-icons/rx"; // Import a close icon
import { IoSearch } from "react-icons/io5";

export default function AdminDatePicker({
  className,
  onDateChange,
  onFilterClick,
  date,
}: React.HTMLAttributes<HTMLDivElement> & { onDateChange: (dateRange: DateRange) => void; onFilterClick: () => void; date: DateRange | undefined; }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDateChange = (newDate: DateRange | undefined) => {
    onDateChange(newDate || { from: undefined, to: undefined });
  };

  const handleClearDates = () => {
    onDateChange({ from: undefined, to: undefined });
  };

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
            aria-label="Select date range"
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
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            className="rounded-md border"
          />
          {/* Clear button */}
          {date?.from && (
            <div className="p-2 flex justify-around">
              <button
                onClick={onFilterClick}
                disabled={!date?.from || !date?.to}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
              >
                <IoSearch className="text-sm" />
                <span>Apply</span>
              </button>
              <button
                onClick={handleClearDates}
                className="text-sm text-red-600 hover:text-red-800 flex items-center space-x-1"
              >
                <RxCross2 className="text-sm" />
                <span>Clear</span>
              </button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}