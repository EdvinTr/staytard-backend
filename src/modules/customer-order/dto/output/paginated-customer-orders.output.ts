import { Field, ObjectType } from '@nestjs/graphql';
import { IPagination } from '../../../../lib/typings/IPagination.interface';
import { CustomerOrder } from '../../entities/customer-order.entity';

@ObjectType()
export class PaginatedCustomerOrdersOutput
  implements IPagination<CustomerOrder>
{
  @Field(() => [CustomerOrder])
  items: CustomerOrder[];

  @Field()
  totalCount: number;

  @Field()
  hasMore: boolean;
}
