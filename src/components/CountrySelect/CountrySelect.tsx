import Select, { type StylesConfig, type SingleValue } from "react-select";
import {
  countryOptions,
  type CountryOption,
} from "../../hooks/useDefaultCountryCode";

interface CountrySelectProps {
  value: CountryOption;
  onChange: (opt: CountryOption) => void;
  theme?: "dark" | "light";
}

const darkStyles: StylesConfig<CountryOption> = {
  control: (base) => ({
    ...base,
    background: "transparent",
    border: "none",
    boxShadow: "none",
    minHeight: "unset",
    cursor: "pointer",
    flexWrap: "nowrap",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0",
    flexWrap: "nowrap",
  }),
  singleValue: (base) => ({
    ...base,
    color: "rgba(255,255,255,0.75)",
    fontSize: "14px",
    fontWeight: 500,
    whiteSpace: "nowrap",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "rgba(255,255,255,0.4)",
    padding: "0 2px 0 0",
    "&:hover": { color: "rgba(255,255,255,0.7)" },
  }),
  indicatorSeparator: () => ({ display: "none" }),
  input: (base) => ({
    ...base,
    color: "white",
    margin: 0,
    padding: 0,
  }),
  menu: (base) => ({
    ...base,
    background: "#0f1a2e",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    zIndex: 9999,
    minWidth: "260px",
  }),
  menuList: (base) => ({
    ...base,
    padding: "4px",
    maxHeight: "240px",
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? "rgba(192,132,252,0.18)" : "transparent",
    color: state.isSelected ? "#c084fc" : "rgba(255,255,255,0.85)",
    fontSize: "13px",
    borderRadius: "6px",
    cursor: "pointer",
    padding: "8px 10px",
  }),
};

const lightStyles: StylesConfig<CountryOption> = {
  control: (base) => ({
    ...base,
    background: "transparent",
    border: "none",
    boxShadow: "none",
    minHeight: "unset",
    cursor: "pointer",
    flexWrap: "nowrap",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0",
    flexWrap: "nowrap",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#374151",
    fontSize: "14px",
    fontWeight: 500,
    whiteSpace: "nowrap",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#9ca3af",
    padding: "0 2px 0 0",
    "&:hover": { color: "#374151" },
  }),
  indicatorSeparator: () => ({ display: "none" }),
  input: (base) => ({
    ...base,
    color: "#374151",
    margin: 0,
    padding: 0,
  }),
  menu: (base) => ({
    ...base,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    zIndex: 9999,
    minWidth: "260px",
  }),
  menuList: (base) => ({
    ...base,
    padding: "4px",
    maxHeight: "240px",
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? "#f3f4f6" : "transparent",
    color: state.isSelected ? "#7c3aed" : "#374151",
    fontSize: "13px",
    borderRadius: "6px",
    cursor: "pointer",
    padding: "8px 10px",
  }),
};

export default function CountrySelect({
  value,
  onChange,
  theme = "dark",
}: Readonly<CountrySelectProps>) {
  const styles = theme === "dark" ? darkStyles : lightStyles;

  return (
    <Select<CountryOption>
      options={countryOptions}
      value={value}
      onChange={(opt: SingleValue<CountryOption>) => {
        if (opt) onChange(opt);
      }}
      styles={styles}
      classNamePrefix="country-select"
      isSearchable
      formatOptionLabel={(opt, { context }) =>
        context === "value" ? (
          <span>{opt.data.code}</span>
        ) : (
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "16px" }}>{opt.data.flag}</span>
            <span style={{ fontWeight: 600, minWidth: "42px" }}>
              {opt.data.code}
            </span>
            <span
              style={{
                opacity: 0.6,
                fontSize: "12px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {opt.data.name}
            </span>
          </span>
        )
      }
      getOptionLabel={(opt) =>
        `${opt.data.flag} ${opt.data.code} ${opt.data.name}`
      }
      getOptionValue={(opt) => opt.value}
      menuPlacement="auto"
      menuPosition="fixed"
      menuPortalTarget={document.body}
    />
  );
}
