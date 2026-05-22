import styles from "./DateRangePicker.module.scss";

export interface DateRange {
  startDate: string;
  endDate: string;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  label?: string;
}

export default function DateRangePicker({
  value,
  onChange,
  label = "DATE RANGE",
}: DateRangePickerProps) {
  function handleStart(e: React.ChangeEvent<HTMLInputElement>) {
    const start = e.target.value;
    onChange({
      startDate: start,
      // clear end if it's now before the new start
      endDate:
        value.endDate && start && start > value.endDate ? "" : value.endDate,
    });
  }

  function handleEnd(e: React.ChangeEvent<HTMLInputElement>) {
    onChange({ startDate: value.startDate, endDate: e.target.value });
  }

  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.inputs}>
        <input
          type="date"
          className={styles.input}
          value={value.startDate}
          max={value.endDate || undefined}
          onChange={handleStart}
        />
        <span className={styles.sep}>–</span>
        <input
          type="date"
          className={styles.input}
          value={value.endDate}
          min={value.startDate || undefined}
          onChange={handleEnd}
        />
      </div>
    </div>
  );
}
