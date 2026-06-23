import type { SelectOption } from '../components/Select/Select';

export const PAGE_SIZE = 25;

export const STATUS_OPTIONS: SelectOption[] = [
  { value: 'all',      label: 'All Status' },
  { value: 'active',   label: 'Active'     },
  { value: 'inactive', label: 'Inactive'   },
];

