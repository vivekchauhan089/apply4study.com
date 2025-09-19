export interface PaginatedRequest {
  limit: number;
  page: number;
}

export interface PaginatedData<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalResults: number;
}

export interface PaginatedResponse<T> extends PaginatedData<T> {
  message: string;
  success: boolean;
}
