import { CreateProductReviewInput } from './create-product-review.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductReviewInput extends PartialType(CreateProductReviewInput) {
  @Field(() => Int)
  id: number;
}
