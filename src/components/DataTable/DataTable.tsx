import RDT from 'react-data-table-component';
import type { DataTableProps } from './types';
import { tableCustomStyles } from './tableStyles';
import './tableTheme';
import styles from './DataTable.module.scss';

export type { TableColumn } from './types';

export default function DataTable<T extends object>({
  columns,
  data,
  keyField = 'id',
  loading = false,
  noDataMessage = 'No data found.',
  selectableRows = false,
  onSelectedRowsChange,
  conditionalRowStyles,
  dense = false,
  highlightOnHover = true,
  striped = false,
  defaultSortFieldId,
  defaultSortAsc = true,
  onSort,
  sortServer = false,
  className,
}: DataTableProps<T>) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <RDT
        theme="creatorAI"
        customStyles={tableCustomStyles}
        columns={columns}
        data={data}
        keyField={keyField}
        progressPending={loading}
        progressComponent={
          <div className={styles.loading}>
            <div className={styles.spinner} />
          </div>
        }
        noDataComponent={
          <div className={styles.empty}>{noDataMessage}</div>
        }
        selectableRows={selectableRows}
        onSelectedRowsChange={onSelectedRowsChange}
        conditionalRowStyles={conditionalRowStyles}
        dense={dense}
        highlightOnHover={highlightOnHover}
        striped={striped}
        defaultSortFieldId={defaultSortFieldId}
        defaultSortAsc={defaultSortAsc}
        onSort={onSort}
        sortServer={sortServer}
      />
    </div>
  );
}
