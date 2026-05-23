import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useDebounce } from "../../hooks/useDebounce";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  /** URL query-param key to read/write. Defaults to "q". */
  paramKey?: string;
  placeholder?: string;
  /** Debounce delay in ms. Defaults to 400. */
  debounceMs?: number;
  /** Optional callback fired after the debounce with the current value. */
  onSearch?: (value: string) => void;
}

export default function SearchBar({
  paramKey = "search",
  placeholder = "Search...",
  debounceMs = 400,
  onSearch,
}: SearchBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Local state tracks every keystroke immediately (no lag in the input)
  const [inputValue, setInputValue] = useState(
    searchParams.get(paramKey) ?? "",
  );

  // Debounced value — only this triggers the URL update
  const debouncedValue = useDebounce(inputValue, debounceMs);

  useEffect(() => {
    // Skip the update if the URL already matches (e.g. on first render)
    const current = searchParams.get(paramKey) ?? "";
    if (current === debouncedValue) return;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        debouncedValue
          ? next.set(paramKey, debouncedValue.trim())
          : next.delete(paramKey);
        return next;
      },
      { replace: true }, // avoid polluting browser history on every keystroke
    );

    onSearch?.(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className={styles.wrapper}>
      <Search size={16} className={styles.icon} />
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label={placeholder}
      />
      {inputValue && (
        <button
          className={styles.clearBtn}
          onClick={() => setInputValue("")}
          aria-label="Clear search"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}
