export class FindProductsDto {
  page: number;
  limit: number;
  categoryPath: string;
  sortBy: string;
  sortDirection: 'ASC' | 'DESC';
}
