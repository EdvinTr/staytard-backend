import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum SORT_BY {
  ID = 'id',
  NAME = 'name',
}
export enum SORT_DIRECTION {
  DESC = 'DESC',
  ASC = 'ASC',
}
registerEnumType(SORT_DIRECTION, {
  name: 'SortDirection', // this one is mandatory
  description: 'The basic directions', // this one is optional
});
registerEnumType(SORT_BY, {
  name: 'SortBy', // this one is mandatory
  description: 'Field to sort the result by', // this one is optional
});

@InputType()
export class GetProductBrandsInput {
  @Field(() => SORT_BY, { nullable: true })
  sortBy?: SORT_BY;

  @Field(() => SORT_DIRECTION, { nullable: true })
  sortDirection?: SORT_DIRECTION;
}
