import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsPostalCode,
  IsString,
  Length,
} from 'class-validator';
import IsValidName from '../../../utils/validation/is-valid-name.decorator';
import IsValidPassword from '../../../utils/validation/is-valid-password.decorator';
import IsValidStreetAddress from '../../../utils/validation/is-valid-street-address.decorator';

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
  @Length(1, 100)
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
