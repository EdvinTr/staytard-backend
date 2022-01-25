import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateCustomerOrderInput } from './create-customer-order.input';

@InputType()
export class UpdateCustomerOrderInput extends PartialType(
  CreateCustomerOrderInput,
) {
  @Field(() => Int)
  id: number;
}
