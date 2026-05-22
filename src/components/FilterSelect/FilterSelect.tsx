import styles from "./FilterSelect.module.scss";

export interface SelectOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function FilterSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "select",
}: FilterSelectProps) {
  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.selectWrap}>
        <select
          className={styles.select}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className={styles.chevron}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 5l4 4 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
