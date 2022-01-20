import { Field, InputType } from '@nestjs/graphql';

// TODO:
// 1. add necessary fields
// 2. Use class-validator to validate each field
@InputType()
export class CreateProductReviewInput {
  @Field()
  title: string;
}
