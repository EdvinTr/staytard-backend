import { Field, InputType } from '@nestjs/graphql';
import { CreateProductOptionInput } from './create-product-option-input.dto';

// TODO: add validation to all fields
@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  originalPrice: number;

  @Field()
  currentPrice: number;

  @Field(() => [String])
  imageUrls: string[];

  @Field()
  categoryId: number;

  @Field()
  brandId: number;

  @Field(() => [CreateProductOptionInput])
  options: CreateProductOptionInput[];
}
