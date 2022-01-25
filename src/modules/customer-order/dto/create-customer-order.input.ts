import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerOrderInput {
  @Field()
  deliveryAddress: string;

  @Field()
  city: string;

  @Field()
  postalCode: string;
}
