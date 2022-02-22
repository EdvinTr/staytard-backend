import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, Max, Min } from 'class-validator';
import {
  CUSTOMER_ORDER_FILTER,
  CUSTOMER_ORDER_SORT_BY,
  SORT_DIRECTION,
} from '../../../../lib/gql-enums';

@InputType()
export class FindAllCustomerOrdersInput {
  @Min(0)
  @Field()
  offset: number;

  @Min(1)
  @Max(50)
  @Field()
  limit: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  q?: string;

  @Field(() => CUSTOMER_ORDER_FILTER, { nullable: true })
  @IsOptional()
  @IsEnum(CUSTOMER_ORDER_FILTER, {
    message: `Filter can only be one of the following: ${Object.values(
      CUSTOMER_ORDER_FILTER,
    ).join(', ')}`,
  })
  filter?: CUSTOMER_ORDER_FILTER;

  @Field(() => CUSTOMER_ORDER_SORT_BY, { nullable: true })
  @IsOptional()
  @IsEnum(CUSTOMER_ORDER_SORT_BY, {
    message: `Sort by can only be one of the following: ${Object.values(
      CUSTOMER_ORDER_SORT_BY,
    ).join(', ')}`,
  })
  sortBy?: CUSTOMER_ORDER_SORT_BY;

  @Field(() => SORT_DIRECTION, { nullable: true })
  @IsOptional()
  @IsEnum(SORT_DIRECTION, {
    message: `Sort direction can only be one of the following: ${Object.values(
      SORT_DIRECTION,
    ).join(', ')}`,
  })
  sortDirection?: SORT_DIRECTION;
}
