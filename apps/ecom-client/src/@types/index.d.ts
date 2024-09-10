interface PaginatedResponse<T> {
  items: T[];
  totalPage: number;
  count: number;
  currentPage: number;
  limit: number;
}

interface PaginatedQuery {
  page?: number;
  limit?: number;
}
