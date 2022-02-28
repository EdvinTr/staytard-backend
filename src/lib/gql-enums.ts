import { registerEnumType } from '@nestjs/graphql';
import { ORDER_STATUS } from '../modules/customer-order/typings/order-status.enum';

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
export enum PRODUCT_REVIEW_FILTER {
  IS_PUBLISHED = 'isPublished',
}
export enum SORT_DIRECTION {
  DESC = 'DESC',
  ASC = 'ASC',
}
export enum USER_SORT_BY {
  ID = 'id',
  IS_ADMIN = 'isAdmin',
}

export enum CUSTOMER_ORDER_SORT_BY {
  ID = 'id',
  CREATED_AT = 'createdAt',
  GRAND_TOTAL = 'grandTotal',
  STATUS = 'status',
}

export enum CUSTOMER_ORDER_FILTER {
  ORDER_STATUS = 'orderStatus',
}

registerEnumType(ORDER_STATUS, {
  name: 'CUSTOMER_ORDER_STATUS',
});

registerEnumType(CUSTOMER_ORDER_FILTER, {
  name: 'CUSTOMER_ORDER_FILTER',
});

registerEnumType(CUSTOMER_ORDER_SORT_BY, {
  name: 'CUSTOMER_ORDER_SORT_BY',
});

registerEnumType(USER_SORT_BY, {
  name: 'USER_SORT_BY',
});
registerEnumType(PRODUCT_REVIEW_FILTER, {
  name: 'PRODUCT_REVIEW_FILTER',
});
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
