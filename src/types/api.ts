export interface Pagination {
  total_records: number;
  page: number;
  page_size: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface ApiListResponse<T> {
  success: boolean;
  message: string;
  count: number;
  pagination: Pagination;
  data: T[];
}
