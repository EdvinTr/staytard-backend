import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrderLineInput {
  @Field()
  name: string;

  @Field()
  quantity: number;

  @Field()
  unit_price: number;

  @Field()
  tax_rate: number;

  @Field()
  total_amount: number;

  @Field()
  total_discount_amount: number;

  @Field()
  total_tax_amount: number;

  @Field()
  product_url: string;

  @Field()
  productId: number;

  @Field()
  image_url: string;

  @Field()
  sku: string;
}
