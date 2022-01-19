export interface IPagination<T> {
  items: T[];
  totalCount: number;
  hasMore: boolean;
}
