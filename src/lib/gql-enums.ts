import { registerEnumType } from '@nestjs/graphql';

export enum BRAND_SORT_BY {
  ID = 'id',
  NAME = 'name',
}
export enum PRODUCT_SORT_BY {
  ID = 'id',
  NAME = 'name',
  CURRENT_PRICE = 'currentPrice',
}
export enum PRODUCT_REVIEW_SORT_BY {
  ID = 'id',
  CREATED_AT = 'createdAt',
}
export enum SORT_DIRECTION {
  DESC = 'DESC',
  ASC = 'ASC',
}
registerEnumType(SORT_DIRECTION, {
  name: 'SORT_DIRECTION',
});
registerEnumType(BRAND_SORT_BY, {
  name: 'BRAND_SORT_BY',
});
registerEnumType(PRODUCT_SORT_BY, {
  name: 'PRODUCT_SORT_BY',
});
registerEnumType(PRODUCT_REVIEW_SORT_BY, {
  name: 'PRODUCT_REVIEW_SORT_BY',
});
