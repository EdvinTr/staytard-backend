import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsPostalCode,
  IsString,
} from 'class-validator';
import IsValidName from '../../../../utils/validation/is-valid-name.decorator';
import IsValidStreetAddress from '../../../../utils/validation/is-valid-street-address.decorator';
import { RegisterUserDto } from '../../../authentication/dto/register-user.dto';

interface UpdateUserInterface extends Omit<RegisterUserDto, 'password'> {}
@InputType()
export class UpdateUserInput implements UpdateUserInterface {
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
