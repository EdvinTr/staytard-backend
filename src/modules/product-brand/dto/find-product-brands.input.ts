import { Field, InputType } from '@nestjs/graphql';
import { BRAND_SORT_BY, SORT_DIRECTION } from '../../../lib/gql-enums';

@InputType()
export class FindProductBrandsInput {
  @Field(() => BRAND_SORT_BY, { nullable: true })
  sortBy?: BRAND_SORT_BY;

  @Field(() => SORT_DIRECTION, { nullable: true })
  sortDirection?: SORT_DIRECTION;
}
