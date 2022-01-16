import { registerEnumType } from '@nestjs/graphql';
import { ProductPermission } from './enums/product-permission.enum';

const Permission = {
  ...ProductPermission,
};

registerEnumType(Permission, {
  name: 'Permission',
  description: 'The permissions of the user',
});

type Permission = ProductPermission; // | AnotherPermissionEnumGoesHere;

export default Permission;
