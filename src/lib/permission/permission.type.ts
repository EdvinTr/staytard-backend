import { registerEnumType } from '@nestjs/graphql';
import { ProductPermission } from './enums/product-permission.enum';
import { ProductReviewPermission } from './enums/product-review-permission.enum';
import { UserPermission } from './enums/user-permission.enum';

const Permission = {
  ...ProductPermission,
  ...ProductReviewPermission,
  ...UserPermission,
};

registerEnumType(Permission, {
  name: 'Permission',
  description: 'The permissions of the user',
});

type Permission = ProductPermission | ProductReviewPermission | UserPermission;

export default Permission;
