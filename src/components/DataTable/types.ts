import type { ReactNode } from 'react';
import type { TableColumn as RDTColumn, ConditionalStyles } from 'react-data-table-component';

export type TableColumn<T> = RDTColumn<T>;

export interface DataTableProps<T extends object> {
  columns: TableColumn<T>[];
  data: T[];
  keyField?: string;
  loading?: boolean;
  noDataMessage?: ReactNode;
  selectableRows?: boolean;
  onSelectedRowsChange?: (state: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: T[];
  }) => void;
  conditionalRowStyles?: ConditionalStyles<T>[];
  dense?: boolean;
  highlightOnHover?: boolean;
  striped?: boolean;
  defaultSortFieldId?: string | number;
  defaultSortAsc?: boolean;
  onSort?: (column: TableColumn<T>, direction: 'asc' | 'desc') => void;
  sortServer?: boolean;
  className?: string;
}
