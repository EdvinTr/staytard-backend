import { Field, InputType } from '@nestjs/graphql';
import { IsPositive, Max, Min } from 'class-validator';
import {
  PRODUCT_REVIEW_SORT_BY,
  SORT_DIRECTION,
} from '../../../../lib/gql-enums';

@InputType()
export class FindPublishedProductReviewsInput {
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

  @Field(() => PRODUCT_REVIEW_SORT_BY, { nullable: true })
  sortBy?: PRODUCT_REVIEW_SORT_BY;

  @Field(() => SORT_DIRECTION, { nullable: true })
  sortDirection?: SORT_DIRECTION;
}
