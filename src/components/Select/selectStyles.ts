import type { StylesConfig, GroupBase } from 'react-select';
import type { SelectOption } from './types';

const FONT = "'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export function buildSelectStyles(): StylesConfig<SelectOption, false, GroupBase<SelectOption>> {
  return {
    container: (base) => ({
      ...base,
      fontFamily: FONT,
    }),
    control: (base) => ({
      ...base,
      background: '#f3f4f6',
      border: 'none',
      borderRadius: '14px',
      boxShadow: 'none',
      minHeight: '46px',
      cursor: 'pointer',
      transition: 'background 0.15s ease',
      '&:hover': {
        background: '#ebebeb',
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '12px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      zIndex: 20,
    }),
    menuList: (base) => ({
      ...base,
      padding: '6px',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#ede9fe'
        : state.isFocused
        ? '#f3f4f6'
        : 'transparent',
      color: state.isSelected ? '#7c3aed' : '#2A0500',
      fontSize: '13.5px',
      fontFamily: FONT,
      borderRadius: '8px',
      cursor: 'pointer',
      padding: '9px 14px',
      transition: 'background 0.12s ease',
      ':active': {
        backgroundColor: '#ede9fe',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: '#878787',
      fontSize: '13.5px',
      fontFamily: FONT,
    }),
    placeholder: (base) => ({
      ...base,
      color: '#878787',
      fontSize: '13.5px',
      fontFamily: FONT,
    }),
    input: (base) => ({
      ...base,
      color: '#2A0500',
      fontSize: '13.5px',
      fontFamily: FONT,
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '2px 16px',
    }),
    indicatorsContainer: (base) => ({
      ...base,
      paddingRight: '4px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: '#374151',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease',
      padding: '0 10px 0 0',
    }),
    clearIndicator: (base) => ({
      ...base,
      color: '#9ca3af',
      padding: '0 4px',
      cursor: 'pointer',
    }),
    noOptionsMessage: (base) => ({
      ...base,
      color: '#878787',
      fontSize: '13.5px',
      fontFamily: FONT,
    }),
  };
}
