import { Field, InputType } from '@nestjs/graphql';
import { ArrayNotEmpty } from 'class-validator';
import { CreateProductAttributeInput } from './create-product-attribute-input.dto';

// TODO: add validation to all fields
@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  unitPrice: number;

  @ArrayNotEmpty()
  @Field(() => [String])
  imageUrls: string[];

  @Field()
  categoryId: number;

  @Field()
  brandId: number;

  @Field(() => [CreateProductAttributeInput])
  attributes: CreateProductAttributeInput[];
}
