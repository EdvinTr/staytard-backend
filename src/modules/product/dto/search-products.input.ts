import { Field, InputType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class SearchProductsInput {
  @Field()
  @Min(1)
  @Max(20)
  resultLimit: number;

  @Field()
  searchTerm: string;
}
