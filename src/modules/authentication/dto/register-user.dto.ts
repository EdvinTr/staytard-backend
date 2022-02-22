import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsPostalCode,
  IsString,
} from 'class-validator';
import { CapitalizeAndTrimTransform } from '../../../utils/transform/capitalize-and-trim.transformer';
import IsAlphaWithSpaces from '../../../utils/validation/is-alpha-with-spaces.decorator';
import IsAlphanumericWithSpaces from '../../../utils/validation/is-alphanumeric-with-spaces.decorator';
import IsValidName from '../../../utils/validation/is-valid-name.decorator';
import IsValidPassword from '../../../utils/validation/is-valid-password.decorator';

export interface RegisterUserInterface {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  street: string;
  city: string;
  postalCode: string;
  mobilePhoneNumber: string;
}
@InputType()
export class RegisterUserDto implements RegisterUserInterface {
  @IsEmail({}, { message: 'Email address is invalid' })
  @Field()
  email: string;

  @IsAlpha('sv-SE', {
    message: 'First name must only contain letters (a-öA-Ö)',
  })
  @IsValidName('firstName')
  @Field()
  firstName: string;

  @IsAlpha('sv-SE', {
    message: 'Last name must only contain letters (a-öA-Ö)',
  })
  @IsValidName('lastName')
  @Field()
  lastName: string;

  @IsMobilePhone(
    'sv-SE',
    {},
    { message: 'Please enter a valid phone number (e.g, 0707123123)' },
  )
  @Field()
  mobilePhoneNumber: string;

  @IsValidPassword('password')
  @Field()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsAlphaWithSpaces('city', 1, 100)
  @CapitalizeAndTrimTransform()
  @Field()
  city: string;

  @IsNotEmpty()
  @IsAlphanumericWithSpaces('street', 1, 36)
  @Field()
  @CapitalizeAndTrimTransform()
  street: string;

  @IsPostalCode('SE', {
    message: 'Enter a postal code with 5 digits (e.g., 44233)',
  })
  @Field()
  postalCode: string;
}
