import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateProductAttributeInput } from './create-product-attribute.input';

@InputType()
export class CreateProductInput {
  @Field()
  @Length(1, 100)
  name: string;

  @Field()
  @Length(1, 1000)
  description: string;

  @Field()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Field(() => [String])
  imageUrls: string[];

  @Field()
  @IsNumber()
  @IsPositive()
  categoryId: number;

  @Field()
  @IsNumber()
  @IsPositive()
  brandId: number;

  @Field(() => [CreateProductAttributeInput])
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => CreateProductAttributeInput)
  attributes: CreateProductAttributeInput[];
}
