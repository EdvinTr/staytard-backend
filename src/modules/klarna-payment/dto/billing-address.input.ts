import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BillingAddressInput {
  @Field()
  given_name: string;

  @Field()
  family_name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  title: string;

  @Field()
  street_address: string;

  @Field()
  postal_code: string;

  @Field()
  city: string;

  @Field({ nullable: true })
  region: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  country: string;
}
