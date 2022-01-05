import { UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from '../authentication/guards/graphql-jwt-auth.guard';
import RequestWithUser from '../authentication/interfaces/request-with-user.interface';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Query(() => User)
  async me(@Context() context: { req: RequestWithUser }): Promise<User> {
    return context.req.user;
  }
}
