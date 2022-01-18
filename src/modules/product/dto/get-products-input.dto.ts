import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetProductsInput {
  @Field()
  offset: number;

  @Field()
  limit: number;

  @Field()
  categorySlug: string;
}
