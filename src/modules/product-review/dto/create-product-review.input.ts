import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductReviewInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
