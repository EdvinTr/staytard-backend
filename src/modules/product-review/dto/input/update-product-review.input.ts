import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsBoolean, IsPositive, Length } from 'class-validator';

@InputType()
export class UpdateProductReviewInput {
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
  isPublished: boolean;

  @IsPositive()
  @Field()
  reviewId: number;
}
