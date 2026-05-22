import ReactSelect from 'react-select';
import type { SingleValue } from 'react-select';
import { buildSelectStyles } from './selectStyles';
import type { SelectProps, SelectOption } from './types';
import styles from './Select.module.scss';

export type { SelectOption } from './types';

export default function Select({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  isSearchable = false,
  isClearable = false,
  isDisabled = false,
  isLoading = false,
  error,
  className,
}: SelectProps) {
  function handleChange(opt: SingleValue<SelectOption>) {
    onChange(opt ?? null);
  }

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {label && <span className={styles.label}>{label}</span>}
      <ReactSelect<SelectOption, false>
        options={options}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isMulti={false}
        styles={buildSelectStyles()}
        classNamePrefix="rs"
        menuPosition="fixed"
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
