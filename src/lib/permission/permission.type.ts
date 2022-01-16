import { ProductPermission } from './enums/product-permission.enum';

const Permission = {
  ...ProductPermission,
};

type Permission = ProductPermission; // | AnotherPermissionEnumGoesHere;

export default Permission;
