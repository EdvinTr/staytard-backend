import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsPostalCode,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';
import { CapitalizeAndTrimTransform } from '../../../../utils/transform/capitalize-and-trim.transformer';
import { isAlphanumericWithSpaces } from '../../../../utils/validation/is-alphanumeric-with-spaces.regex';
import IsValidName from '../../../../utils/validation/is-valid-name.decorator';

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
  mobilePhoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsAlpha('sv-SE')
  @CapitalizeAndTrimTransform()
  @Length(1, 100)
  @Field()
  city: string;

  @IsNotEmpty()
  @Matches(isAlphanumericWithSpaces(1, 36), {
    message: '$property must only consist of letters and numbers',
  })
  @Field()
  @CapitalizeAndTrimTransform()
  street: string;

  @IsPostalCode('SE', {
    message: 'Enter a postal code with 5 digits (e.g., 44233)',
  })
  @Field()
  postalCode: string;
}