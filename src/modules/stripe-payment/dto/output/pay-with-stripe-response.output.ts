import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PayWithStripeResponseOutput {
  @Field()
  success?: boolean;

  @Field({ nullable: true })
  requires_action?: boolean;

  @Field({ nullable: true })
  payment_intent_client_secret?: string;

  @Field({ nullable: true })
  error?: string;
}
