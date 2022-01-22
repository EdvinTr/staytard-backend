import { registerEnumType } from '@nestjs/graphql';
import { ProductPermission } from './enums/product-permission.enum';
import { ProductReviewPermission } from './enums/product-review-permission.enum';

const Permission = {
  ...ProductPermission,
  ...ProductReviewPermission,
};

registerEnumType(Permission, {
  name: 'Permission',
  description: 'The permissions of the user',
});

type Permission = ProductPermission | ProductReviewPermission;

export default Permission;
