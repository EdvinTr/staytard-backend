import { Field, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsPostalCode,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { capitalize } from 'lodash';
import ArrayDistinct from '../../../utils/validation/array-distinct.decorator';

//TODO : should also probably receive a token or something from Klarna/PayPal to confirm from the backend that the payment ACTUALLY occurred.
@InputType()
export class OrderItemInput {
  @Field()
  @IsNumber()
  @IsPositive()
  productId: number;

  @Field()
  @IsNumber()
  @IsPositive()
  quantity: number;
}
@InputType()
export class CreateCustomerOrderInput {
  @IsNotEmpty()
  @Field()
  @MinLength(1)
  @MaxLength(36)
  @Transform(({ value }) => capitalize(value))
  deliveryAddress: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  @Transform(({ value }) => capitalize(value))
  city: string;

  @IsPostalCode('any')
  @Field()
  postalCode: string;

  @ValidateNested()
  @ArrayDistinct('productId')
  @Type(() => OrderItemInput)
  @Field(() => [OrderItemInput])
  orderItems: OrderItemInput[];
}
