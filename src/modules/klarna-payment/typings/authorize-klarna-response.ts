import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorizedPaymentMethod {
  @Field()
  type: string;
}

@ObjectType()
export class AuthorizeKlarnaResponse {
  @Field()
  order_id: string;

  @Field()
  redirect_url: string;

  @Field()
  fraud_status: string;

  @Field(() => AuthorizedPaymentMethod)
  authorized_payment_method: AuthorizedPaymentMethod;
}
