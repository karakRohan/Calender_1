import { format, isToday } from "date-fns";

interface DayProps {
  date: Date;
  isCurrentMonth: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  onClick: (date: Date) => void;
}

const Day = ({ date, isCurrentMonth, isStart, isEnd, isInRange, onClick }: DayProps) => {
  const today = isToday(date);
  const dayNum = format(date, "d");

  const getClasses = () => {
    const base = "relative flex items-center justify-center h-10 w-10 text-sm cursor-pointer transition-all duration-200 select-none";

    if (!isCurrentMonth) return `${base} text-muted-foreground/40`;

    if (isStart || isEnd) {
      return `${base} bg-primary text-primary-foreground font-semibold rounded-full shadow-md scale-105`;
    }

    if (isInRange) {
      return `${base} bg-calendar-range-light text-primary font-medium`;
    }

    if (today) {
      return `${base} font-bold text-primary ring-2 ring-primary/30 rounded-full`;
    }

    return `${base} text-foreground hover:bg-calendar-hover rounded-full`;
  };

  const isRangeStart = isStart && isInRange;
  const isRangeEnd = isEnd && isInRange;

  return (
    <div
      className={`flex items-center justify-center ${
        isInRange && !isStart && !isEnd ? "bg-calendar-range-light" : ""
      } ${isRangeStart ? "bg-gradient-to-r from-transparent to-calendar-range-light rounded-l-full" : ""} ${
        isRangeEnd ? "bg-gradient-to-l from-transparent to-calendar-range-light rounded-r-full" : ""
      }`}
    >
      <button
        onClick={() => onClick(date)}
        className={getClasses()}
        aria-label={format(date, "MMMM d, yyyy")}
      >
        {dayNum}
      </button>
    </div>
  );
};

export default Day;
