import { Field, InputType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class FindCustomerOrdersInput {
  @Min(0)
  @Field()
  offset: number;

  @Min(1)
  @Max(50)
  @Field()
  limit: number;
}
