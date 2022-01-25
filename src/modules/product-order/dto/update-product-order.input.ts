import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateProductOrderInput } from './create-product-order.input';

@InputType()
export class UpdateProductOrderInput extends PartialType(
  CreateProductOrderInput,
) {
  @Field(() => Int)
  id: number;
}
