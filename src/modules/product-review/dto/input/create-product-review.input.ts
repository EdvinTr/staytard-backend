import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsPositive,
  Length,
  Max,
  Min,
} from 'class-validator';
@InputType()
export class CreateProductReviewInput {
  @Length(1, 100)
  @Transform(({ value }) => value.trim())
  @Field()
  title: string;

  @Length(1, 1000)
  @Transform(({ value }) => value.trim())
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

  @Length(1, 50)
  @Field()
  nickname: string;

  @IsEmail()
  @Field()
  email: string;

  @IsNumber()
  @IsPositive()
  @Field()
  productId: number;
}
