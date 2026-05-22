import type { RegisterOptions } from 'react-hook-form';

export type FieldType =
  | 'text' | 'email' | 'password' | 'number' | 'date'
  | 'textarea' | 'select' | 'multi-select'
  | 'checkbox' | 'switch'
  | 'field-array' | 'price-calc';

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  validation?: RegisterOptions;
  options?: FieldOption[];   // select / multi-select
  prefix?: string;           // e.g. '€'
  suffix?: string;
  colSpan?: 'full' | 'half'; // default 'half'
  rows?: number;             // textarea
  disabled?: boolean;
  helpText?: string;
  addButtonLabel?: string;   // field-array
  itemPlaceholder?: string;  // field-array
}

export interface DynamicFormProps {
  formConfig: FieldConfig[];
  defaultValues?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => void | Promise<void>;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
}
