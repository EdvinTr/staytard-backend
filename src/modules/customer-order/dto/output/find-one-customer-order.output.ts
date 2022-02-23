import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../user/entities/user.entity';
import { CustomerOrder } from '../../entities/customer-order.entity';

@ObjectType()
export class FindOneCustomerOrderOutput {
  @Field(() => CustomerOrder)
  order: CustomerOrder;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Boolean)
  isEditable: boolean;
}
