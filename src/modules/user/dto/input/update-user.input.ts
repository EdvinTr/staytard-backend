import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsPostalCode, IsString } from 'class-validator';
import IsValidStreetAddress from '../../../../utils/validation/is-valid-street-address.decorator';

@InputType()
export class UpdateUserInput {
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
