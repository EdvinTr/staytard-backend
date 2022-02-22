import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, Max, Min } from 'class-validator';
import {
  CUSTOMER_ORDER_SORT_BY,
  SORT_DIRECTION,
} from '../../../../lib/gql-enums';
import { ORDER_STATUS } from '../../typings/order-status.enum';

@InputType()
export class CustomerOrderFilter {
  @IsEnum(ORDER_STATUS, {
    message: `Status filter can only be one of the following: ${Object.values(
      ORDER_STATUS,
    ).join(', ')}`,
  })
  @Field(() => [ORDER_STATUS], { nullable: true })
  orderStatusFilter?: ORDER_STATUS[];
}

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

  @Field(() => CustomerOrderFilter, { nullable: true })
  filters?: CustomerOrderFilter;

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
