import { useState, useEffect } from "react";
import { format } from "date-fns";

interface NotesProps {
  startDate: Date | null;
  endDate: Date | null;
}

const getStorageKey = (start: Date | null, end: Date | null) => {
  if (start && end) {
    return `calendar-note-${format(start, "yyyy-MM-dd")}_${format(end, "yyyy-MM-dd")}`;
  }
  return "calendar-note-general";
};

const Notes = ({ startDate, endDate }: NotesProps) => {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const storageKey = getStorageKey(startDate, endDate);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    setNote(stored || "");
    setSaved(false);
  }, [storageKey]);

  const handleSave = () => {
    localStorage.setItem(storageKey, note);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const label =
    startDate && endDate
      ? `${format(startDate, "MMM d")} – ${format(endDate, "MMM d")}`
      : "General";

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold text-foreground mb-1" style={{ fontFamily: "var(--font-display)" }}>
        Notes
      </h2>
      <p className="text-xs text-muted-foreground mb-3">{label}</p>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write something..."
        className="flex-1 min-h-[140px] w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none transition-shadow"
      />
      <button
        onClick={handleSave}
        className="mt-3 w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-[hsl(185,80%,50%)] text-primary-foreground font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        {saved ? "✓ Saved!" : "Save"}
      </button>
    </div>
  );
};

export default Notes;
