import { Field, InputType } from '@nestjs/graphql';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
@InputType()
class AttributeValueType {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  value: string;
}

@InputType()
export class CreateProductAttributeInput {
  @Field(() => AttributeValueType)
  @ValidateNested()
  @Type(() => AttributeValueType)
  size: AttributeValueType;

  @Field(() => AttributeValueType)
  @ValidateNested()
  @Type(() => AttributeValueType)
  color: AttributeValueType;

  @Field()
  @IsPositive()
  quantity: number;
}
