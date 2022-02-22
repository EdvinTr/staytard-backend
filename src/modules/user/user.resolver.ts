import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import Permission from '../../lib/permission/permission.type';
import { GraphqlJwtAuthGuard } from '../authentication/guards/graphql-jwt-auth.guard';
import PermissionGuard from '../authentication/guards/permission.guard';
import RequestWithUser from '../authentication/interfaces/request-with-user.interface';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { FindAllUsersInput } from './dto/input/find-all-users.input';
import { UpdateUserAddressInput } from './dto/input/update-user-address.input';
import { UpdateUserPasswordInput } from './dto/input/update-user-password.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { PaginatedUsersOutput } from './dto/output/PaginatedUsers.output';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Query(() => User)
  async me(@Context() context: { req: RequestWithUser }): Promise<User> {
    /*  const user = context.req.user;
    user.permissions = [...Object.values(Permission).map((p) => p)];
    user.isAdmin = true;
    await this.userService.save(user); */
    return context.req.user;
  }

  @UseGuards(PermissionGuard(Permission.UPDATE_USER))
  @Mutation(() => User)
  async updateUser(
    @Context() context: { req: RequestWithUser },
    @Args('input') input: UpdateUserInput,
  ) {
    return this.userService.update(context.req.user.id, input);
  }

  @UseGuards(PermissionGuard(Permission.DELETE_USER))
  @Mutation(() => Boolean)
  async deleteUser(
    @Context() context: { req: RequestWithUser },
    @Args('input') input: DeleteUserInput,
  ) {
    const userIdFromRequest = context.req.user.id;
    return this.userService.softDelete(userIdFromRequest, input);
  }

  @UseGuards(PermissionGuard(Permission.READ_USER))
  @Query(() => PaginatedUsersOutput)
  async users(
    @Args('input') input: FindAllUsersInput,
  ): Promise<PaginatedUsersOutput> {
    return this.userService.findAll(input);
  }
  @UseGuards(PermissionGuard(Permission.READ_USER))
  @Query(() => User)
  async user(@Args('id') id: string): Promise<User | undefined> {
    return this.userService.findById(id);
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

  @UseGuards(GraphqlJwtAuthGuard)
  @Query(() => Boolean)
  async hasPassword(
    @Context() { req }: { req: RequestWithUser },
  ): Promise<boolean> {
    return this.userService.hasPassword(req.user.id); // check if user has a password field in database
  }
}
