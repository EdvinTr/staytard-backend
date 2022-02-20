import { Field, ObjectType } from '@nestjs/graphql';
import { IPagination } from '../../../../lib/typings/IPagination.interface';
import { User } from '../../entities/user.entity';

@ObjectType()
export class PaginatedUsersOutput implements IPagination<User> {
  @Field(() => [User])
  items: User[];

  @Field()
  totalCount: number;

  @Field()
  hasMore: boolean;
}
