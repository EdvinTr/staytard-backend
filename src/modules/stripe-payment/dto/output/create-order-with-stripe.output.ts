import { Field, ObjectType } from '@nestjs/graphql';
import { CustomerOrder } from '../../../customer-order/entities/customer-order.entity';

@ObjectType()
export class CreateOrGetOrderWithStripeOutput {
  @Field()
  wasCreated: boolean;

  @Field(() => CustomerOrder)
  order: CustomerOrder;
}
