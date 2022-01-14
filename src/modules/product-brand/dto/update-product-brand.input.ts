import { CreateProductBrandInput } from './create-product-brand.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductBrandInput extends PartialType(CreateProductBrandInput) {
  @Field(() => Int)
  id: number;
}
