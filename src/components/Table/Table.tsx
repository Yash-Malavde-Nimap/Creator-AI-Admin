import type { ReactNode } from 'react';
import styles from './Table.module.scss';

export type RowData = Record<string, unknown>;

export interface Column {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  render?: (value: unknown, row: RowData) => ReactNode;
}

interface TableProps {
  columns: Column[];
  data: RowData[];
  rowKey: string;
  emptyMessage?: string;
}

export default function Table({
  columns,
  data,
  rowKey,
  emptyMessage = 'No data found.',
}: TableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={styles.th}
                style={{ width: col.width, textAlign: col.align ?? 'left' }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {data.length === 0 ? (
            <tr>
              <td className={styles.empty} colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={String(row[rowKey])} className={styles.tr}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={styles.td}
                    style={{ textAlign: col.align ?? 'left' }}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
