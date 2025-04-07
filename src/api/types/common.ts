export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface ApiQueryParams {
  query?: string;
  page?: number;
  limit?: number;
  per_page?: number;
  locale?: string;
  size?: number | string;
  is_popular?: any;
  sort?: string;
  order?: 'asc' | 'desc';
  [key: string]: any;
} 