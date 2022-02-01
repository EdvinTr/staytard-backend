import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BillingAddressInput {
  @Field({ nullable: true })
  given_name: string;

  @Field({ nullable: true })
  family_name: string;

  @Field({ nullable: true })
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

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  country: string;
}
