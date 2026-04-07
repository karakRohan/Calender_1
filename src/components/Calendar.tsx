import { useState, useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  format,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Day from "./Day";
import Notes from "./Notes";
import heroImage from "@/assets/hero-mountain.jpg";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectionStep, setSelectionStep] = useState<0 | 1 | 2>(0);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart);
    const calEnd = endOfWeek(monthEnd);
    const days: Date[] = [];
    let day = calStart;
    while (day <= calEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentMonth]);

  const handleDayClick = (date: Date) => {
    if (selectionStep === 0) {
      setStartDate(date);
      setEndDate(null);
      setSelectionStep(1);
    } else if (selectionStep === 1) {
      if (isBefore(date, startDate!)) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
      setSelectionStep(2);
    } else {
      setStartDate(date);
      setEndDate(null);
      setSelectionStep(1);
    }
  };

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return isAfter(date, startDate) && isBefore(date, endDate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl bg-card rounded-2xl shadow-[var(--shadow-elevated)] overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Calendar Section */}
          <div className="flex-1 min-w-0">
            {/* Hero Image */}
            <div className="relative h-56 md:h-64 overflow-hidden">
              <img
                src={heroImage}
                alt="Mountain landscape"
                className="w-full h-full object-cover"
                width={1200}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-6 text-right">
                <p className="text-foreground/70 text-lg font-medium" style={{ fontFamily: "var(--font-display)" }}>
                  {format(currentMonth, "MMMM")}
                </p>
                <p className="text-foreground text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  {format(currentMonth, "yyyy")}
                </p>
              </div>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between px-6 pt-4 pb-2">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <h2 className="text-base font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 px-6 pb-1">
              {WEEKDAYS.map((day) => (
                <div key={day} className="flex items-center justify-center h-8 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 px-6 pb-6">
              {calendarDays.map((date, i) => (
                <Day
                  key={i}
                  date={date}
                  isCurrentMonth={isSameMonth(date, currentMonth)}
                  isStart={!!startDate && isSameDay(date, startDate)}
                  isEnd={!!endDate && isSameDay(date, endDate)}
                  isInRange={isInRange(date)}
                  onClick={handleDayClick}
                />
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="lg:w-72 border-t lg:border-t-0 lg:border-l border-border p-6">
            <Notes startDate={startDate} endDate={endDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
