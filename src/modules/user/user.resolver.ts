import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from '../authentication/guards/graphql-jwt-auth.guard';
import RequestWithUser from '../authentication/interfaces/request-with-user.interface';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UpdateUserAddressInput } from './dto/update-user-address.input';
import { UpdateUserPasswordInput } from './dto/update-user-password.input';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Query(() => User)
  async me(@Context() context: { req: RequestWithUser }): Promise<User> {
    /* const user = context.req.user;
    user.permissions = [
      ...user.permissions,
      ProductPermission.CREATE_PRODUCT,
      ProductPermission.DELETE_PRODUCT,
    ];
    await this.userService.save(user); */
    return context.req.user;
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => User)
  async updateUserAddress(
    @Context() { req }: { req: RequestWithUser },
    @Args('input') input: UpdateUserAddressInput,
  ): Promise<User> {
    return this.userService.updateAddress(req.user.id, input);
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => Boolean)
  async updatePassword(
    @Context() { req }: { req: RequestWithUser },
    @Args('input') input: UpdateUserPasswordInput,
  ): Promise<boolean> {
    return this.userService.updatePassword(req.user.id, input);
  }
}
