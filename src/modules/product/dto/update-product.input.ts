import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateProductAttributeInput } from './create-product-attribute.input';

@InputType()
export class UpdateProductInput {
  @Field()
  @IsPositive()
  productId: number;

  @Field()
  @Length(1, 100)
  name: string;

  @Field()
  @Length(1, 1000)
  description: string;

  @Field()
  @IsNumber()
  @IsPositive()
  currentPrice: number;

  @Field()
  @IsBoolean()
  isDiscontinued: boolean;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Field(() => [String])
  imageUrls: string[];

  @Field(() => [CreateProductAttributeInput])
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => CreateProductAttributeInput)
  attributes: CreateProductAttributeInput[];
}
