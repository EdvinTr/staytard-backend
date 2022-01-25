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
  public readonly productId: number;

  @Field()
  @IsNumber()
  @IsPositive()
  public readonly quantity: number;
}
@InputType()
export class CreateCustomerOrderInput {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(36)
  @Transform(({ value }) => capitalize(value))
  @Field()
  public readonly deliveryAddress: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => capitalize(value))
  @Field()
  public readonly city: string;

  @IsPostalCode('any')
  @Field()
  public readonly postalCode: string;

  @ValidateNested()
  @ArrayDistinct('productId')
  @Type(() => OrderItemInput)
  @Field(() => [OrderItemInput])
  public readonly orderItems: OrderItemInput[];
}
