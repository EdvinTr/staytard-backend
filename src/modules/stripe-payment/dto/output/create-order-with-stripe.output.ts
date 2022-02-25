import { Field, ObjectType } from '@nestjs/graphql';
import { CustomerOrder } from '../../../customer-order/entities/customer-order.entity';
import { User } from '../../../user/entities/user.entity';

@ObjectType()
export class CreateOrGetOrderWithStripeOutput {
  @Field()
  wasCreated: boolean;

  @Field(() => CustomerOrder)
  order: CustomerOrder;

  @Field(() => User, { nullable: true })
  user?: User;
}
