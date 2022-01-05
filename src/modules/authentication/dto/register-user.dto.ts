import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class RegisterUserDto {
  @IsEmail({}, { message: 'Email address is invalid' })
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'First name must be at least $constraint1 characters long',
  })
  @MaxLength(50, {
    message:
      'First name must be less than or equal to $constraint1 characters long',
  })
  @Field()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'Last name must be at least $constraint1 characters long',
  })
  @MaxLength(100, {
    message:
      'Last name must be less than or equal to $constraint1 characters long',
  })
  @Field()
  lastName: string;

  @IsString()
  @IsMobilePhone(
    'sv-SE',
    {},
    { message: 'Please enter a valid phone number (e.g, 0707123123)' },
  )
  @Field()
  mobilePhoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: `Password must be longer than or equal to $constraint1 characters`,
  })
  @Field()
  password: string;

  // should include postal code and address
}
