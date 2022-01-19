import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Matches, Max, Min } from 'class-validator';

@InputType()
export class GetProductsInput {
  @Field()
  @Min(0)
  offset: number;

  @Field()
  @Min(1)
  @Max(50)
  limit: number;

  @Field()
  @Matches(/\//, { message: 'Category path must contain a slash' })
  @Transform(({ value }) => value.toLowerCase())
  categoryPath: string;
}
