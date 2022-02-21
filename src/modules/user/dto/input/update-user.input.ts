import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsPostalCode,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { CapitalizeAndTrimTransform } from '../../../../utils/transform/capitalize-and-trim.transformer';
import IsValidName from '../../../../utils/validation/is-valid-name.decorator';
import IsValidStreetAddress from '../../../../utils/validation/is-valid-street-address.decorator';

interface UpdateUserInterface {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postalCode: string;
  mobilePhoneNumber: string;
}
@InputType()
export class UpdateUserInput implements UpdateUserInterface {
  @IsUUID()
  @Field()
  userId: string;

  @IsEmail({}, { message: 'Email address is invalid' })
  @Field()
  email: string;

  @IsAlpha('sv-SE', {
    message: 'First name must only contain letters (a-öA-Ö)',
  })
  @IsValidName('firstName')
  @CapitalizeAndTrimTransform()
  @Field()
  firstName: string;

  @IsAlpha('sv-SE', {
    message: 'Last name must only contain letters (a-öA-Ö)',
  })
  @IsValidName('lastName')
  @CapitalizeAndTrimTransform()
  @Field()
  lastName: string;

  @IsMobilePhone(
    'sv-SE',
    {},
    { message: 'Please enter a valid phone number (e.g, 0707123123)' },
  )
  @Field()
  @IsOptional()
  mobilePhoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @CapitalizeAndTrimTransform()
  @Length(1, 100)
  @Field()
  city: string;

  @IsNotEmpty()
  @Field()
  @IsValidStreetAddress('street')
  @CapitalizeAndTrimTransform()
  street: string;

  @IsPostalCode('SE', {
    message: 'Enter a postal code with 5 digits (e.g., 44233)',
  })
  @Field()
  postalCode: string;
}
