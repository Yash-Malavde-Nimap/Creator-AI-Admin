export type SortDir = 'none' | 'asc' | 'desc';

export function cycleSortDir(current: SortDir): SortDir {
  return current === 'none' ? 'asc' : current === 'asc' ? 'desc' : 'none';
}

export function calcTotalPages(totalItems: number, pageSize: number): number {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function getPageSlice<T>(data: T[], page: number, pageSize: number): T[] {
  return data.slice((page - 1) * pageSize, page * pageSize);
}

/** Matches the active/inactive status filter value against a boolean active field. */
export function matchStatusFilter(active: boolean, filterValue: string): boolean {
  if (filterValue === 'all') return true;
  return filterValue === 'active' ? active : !active;
}
