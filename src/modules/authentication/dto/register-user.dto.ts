import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsPostalCode,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import IsValidPassword from '../../../utils/validation/is-valid-password.decorator';
import IsValidStreetAddress from '../../../utils/validation/is-valid-street-address.decorator';

@InputType()
export class RegisterUserDto {
  @IsEmail({}, { message: 'Email address is invalid' })
  @Field()
  email: string;

  @IsAlpha('sv-SE', {
    message: 'First name must only contain letters (a-öA-Ö)',
  })
  @MinLength(2, {
    message: 'First name must be at least $constraint1 characters long',
  })
  @MaxLength(100, {
    message:
      'First name must be less than or equal to $constraint1 characters long',
  })
  @Field()
  firstName: string;

  @IsAlpha('sv-SE', {
    message: 'Last name must only contain letters (a-öA-Ö)',
  })
  @MinLength(2, {
    message: 'Last name must be at least $constraint1 characters long',
  })
  @MaxLength(100, {
    message:
      'Last name must be less than or equal to $constraint1 characters long',
  })
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

  // address validation
  @IsString()
  @IsNotEmpty()
  @Field()
  city: string;

  @IsNotEmpty()
  @Field()
  @IsValidStreetAddress('street')
  street: string;

  @IsPostalCode('SE', {
    message: 'Enter a postal code with 5 digits (e.g., 44233)',
  })
  @Field()
  postalCode: string;
}
