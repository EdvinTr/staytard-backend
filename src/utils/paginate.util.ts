import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pagination {
  @Field(() => Int)
  totalPages: number;

  @Field(() => Int, { nullable: true })
  previousPage?: number | null;

  @Field(() => Int, { nullable: true })
  nextPage?: number | null;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  limit: number;
}

export const paginate = (
  page: number,
  totalItems: number,
  limit: number,
): Pagination => {
  return {
    limit,
    totalItems,
    totalPages: getTotalPages(totalItems, limit),
    nextPage: getNextPage(totalItems, limit, page),
    previousPage: getPreviousPage(page),
    currentPage: page,
  };
};

export const getOffset = (page: number, limit: number): number => {
  return page * limit - limit;
};

export const getTotalPages = (totalItems: number, limit: number): number => {
  const totalPages = Math.ceil(totalItems / limit);
  return totalPages === 0 ? 1 : totalPages;
};

export const getNextPage = (
  totalItems: number,
  limit: number,
  page: number,
): number | null => {
  if (totalItems / limit > page) {
    return page + 1;
  }
  return null;
};

export const getPreviousPage = (page: number) => {
  if (page <= 1) {
    return null;
  }
  return page - 1;
};
