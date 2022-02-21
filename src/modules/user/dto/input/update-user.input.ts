import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsPostalCode,
  IsString,
  IsUUID,
} from 'class-validator';
import { CapitalizeAndTrim } from '../../../../utils/transform/capitalize-and-trim.transformer';
import IsValidName from '../../../../utils/validation/is-valid-name.decorator';
import IsValidStreetAddress from '../../../../utils/validation/is-valid-street-address.decorator';
import { RegisterUserDto } from '../../../authentication/dto/register-user.dto';

interface UpdateUserInterface extends Omit<RegisterUserDto, 'password'> {}
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
  @CapitalizeAndTrim()
  @Field()
  firstName: string;

  @IsAlpha('sv-SE', {
    message: 'Last name must only contain letters (a-öA-Ö)',
  })
  @IsValidName('lastName')
  @CapitalizeAndTrim()
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
  @CapitalizeAndTrim()
  @Field()
  city: string;

  @IsNotEmpty()
  @Field()
  @IsValidStreetAddress('street')
  @CapitalizeAndTrim()
  street: string;

  @IsPostalCode('SE', {
    message: 'Enter a postal code with 5 digits (e.g., 44233)',
  })
  @Field()
  postalCode: string;
}
