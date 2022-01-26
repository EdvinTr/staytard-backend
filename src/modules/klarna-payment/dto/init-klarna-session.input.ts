import { Field, InputType } from '@nestjs/graphql';
import { BillingAddressInput } from './billing-address.input';
import { OrderLineInput } from './order-line.input';

@InputType()
export class InitKlarnaSessionInput {
  @Field()
  purchase_country: string;

  @Field()
  purchase_currency: string;

  @Field()
  locale: string;

  @Field()
  order_amount: number;

  @Field()
  order_tax_amount: number;

  @Field(() => [OrderLineInput])
  order_lines: OrderLineInput[];

  @Field(() => BillingAddressInput)
  billing_address: BillingAddressInput;
}
