import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PayWithStripeInput {
  @Field({ nullable: true })
  paymentMethodId?: string;

  @Field({ nullable: true })
  paymentIntentId?: string;
}
