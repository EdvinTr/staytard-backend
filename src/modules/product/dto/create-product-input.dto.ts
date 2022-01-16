import { Field, InputType } from '@nestjs/graphql';
import { CreateProductAttributeInput } from './create-product-attribute-input.dto';

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

  @Field(() => [CreateProductAttributeInput])
  attributes: CreateProductAttributeInput[];
}
