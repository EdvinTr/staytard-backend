import { Field, InputType } from '@nestjs/graphql';
import {Column} from "typeorm";

// TODO:
// 1. add necessary fields
// 2. Use class-validator to validate each field

import {
  IsBoolean, IsEmail,
  IsNumber,
  IsPositive,
  Length, Max, Min,
} from 'class-validator';

@InputType()
export class CreateProductReviewInput {
  @Length (1,100)
  @Field()
  title: string;
  @Length(1,1000)
  @Field()
  content: string;

  @IsBoolean()
  @Field()
  wouldRecommend: boolean;

  @IsNumber()
  @Min(1)
  @Max(5)
  @Field()
  rating: number;

  @Length(1,50)
  @Field()
  submittedByAlias: string;

  @IsEmail()
  @Field()
  email: string;

  @IsNumber()
  @IsPositive()
  @Field()
  productId: number;
}
