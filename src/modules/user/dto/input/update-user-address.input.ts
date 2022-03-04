import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsPostalCode,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CapitalizeAndTrimTransform } from '../../../../utils/transform/capitalize-and-trim.transformer';

@InputType()
export class UpdateUserAddressInput {
  @IsString()
  @IsNotEmpty()
  @CapitalizeAndTrimTransform()
  @Field()
  city: string;

  @IsNotEmpty()
  @Field()
  @MinLength(1)
  @MaxLength(36)
  @CapitalizeAndTrimTransform()
  street: string;

  @IsPostalCode('SE', {
    message: 'Enter a postal code with 5 digits (e.g., 44233)',
  })
  @Transform(({ value }) => value.split(' ').join(''))
  @Field()
  postalCode: string;
}
