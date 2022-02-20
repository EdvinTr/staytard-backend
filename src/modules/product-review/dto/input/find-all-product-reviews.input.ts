import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, Max, Min } from 'class-validator';
import {
  PRODUCT_REVIEW_FILTER,
  PRODUCT_REVIEW_SORT_BY,
  SORT_DIRECTION,
} from '../../../../lib/gql-enums';

@InputType()
export class ProductReviewsFilterInput {
  @Field(() => PRODUCT_REVIEW_FILTER)
  type: PRODUCT_REVIEW_FILTER;

  @Field()
  applied: boolean;
}
@InputType()
export class FindAllProductReviewsInput {
  @Field()
  @Min(0)
  offset: number;

  @Field()
  @Min(1)
  @Max(50)
  limit: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  q: string;

  @Field(() => ProductReviewsFilterInput, { nullable: true })
  filter?: ProductReviewsFilterInput;

  @Field(() => PRODUCT_REVIEW_SORT_BY, { nullable: true })
  sortBy?: PRODUCT_REVIEW_SORT_BY;

  @Field(() => SORT_DIRECTION, { nullable: true })
  sortDirection?: SORT_DIRECTION;
}
