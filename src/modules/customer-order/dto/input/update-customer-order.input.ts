import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsPositive,
  IsPostalCode,
  IsString,
} from 'class-validator';
import { CapitalizeAndTrimTransform } from '../../../../utils/transform/capitalize-and-trim.transformer';
import IsAlphaWithSpaces from '../../../../utils/validation/is-alpha-with-spaces.decorator';
import IsAlphanumericWithSpaces from '../../../../utils/validation/is-alphanumeric-with-spaces.decorator';
import { ORDER_STATUS } from '../../typings/order-status.enum';

@InputType()
export class UpdateCustomerOrderInput {
  @IsPositive()
  @Field()
  public orderId: number;

  @IsString()
  @IsNotEmpty()
  @IsAlphaWithSpaces('city', 1, 100)
  @CapitalizeAndTrimTransform()
  @Field()
  public city: string;

  @IsNotEmpty()
  @IsAlphanumericWithSpaces('deliveryAddress', 1, 36)
  @Field()
  @CapitalizeAndTrimTransform()
  public deliveryAddress: string;

  @IsPostalCode('SE', {
    message: 'Enter a postal code with 5 digits (e.g., 44233)',
  })
  @Field()
  public postalCode: string;

  @Field(() => ORDER_STATUS)
  public orderStatus: ORDER_STATUS;
}
