import { Field, InputType } from '@nestjs/graphql';
import { IsPositive, Max, Min } from 'class-validator';

@InputType()
export class FindProductReviewsInput {
  @Field()
  @IsPositive()
  productId: number;

  @Field()
  @Min(0)
  offset: number;

  @Field()
  @Min(1)
  @Max(20)
  limit: number;
}
