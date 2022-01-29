import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Matches, Max, Min } from 'class-validator';
import { PRODUCT_SORT_BY, SORT_DIRECTION } from '../../../lib/gql-enums';

@InputType()
export class FindProductsInput {
  @Field()
  @Min(0)
  offset: number;

  @Field()
  @Min(1)
  @Max(50)
  limit: number;

  @Field()
  @Matches(/\//, {
    message: 'Category path must contain a slash',
  })
  @Transform(({ value }) => value.toLowerCase())
  categoryPath: string;

  @Field(() => PRODUCT_SORT_BY, { nullable: true })
  sortBy?: PRODUCT_SORT_BY;

  @Field(() => SORT_DIRECTION, { nullable: true })
  sortDirection?: SORT_DIRECTION;
}
