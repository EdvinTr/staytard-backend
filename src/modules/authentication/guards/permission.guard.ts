import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import Permission from '../../../lib/permission/permission.type';
import { GraphqlJwtAuthGuard } from './graphql-jwt-auth.guard';

const PermissionGuard = (permission: Permission): Type<CanActivate> => {
  class PermissionGuardMixin extends GraphqlJwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      const user = request.user;

      return user?.permissions.includes(permission);
    }
  }
  return mixin(PermissionGuardMixin);
};

export default PermissionGuard;
