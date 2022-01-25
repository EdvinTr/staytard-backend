import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrderItemInput {
  @Field()
  productId: number;

  @Field()
  quantity: number;
}
@InputType()
export class CreateCustomerOrderInput {
  @Field()
  deliveryAddress: string;

  @Field()
  city: string;

  @Field()
  postalCode: string;

  @Field(() => [OrderItemInput])
  orderItems: OrderItemInput[];
}
