import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProductReview {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
