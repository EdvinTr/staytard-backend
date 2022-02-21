import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsPostalCode,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateUserAddressInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  city: string;

  @IsNotEmpty()
  @Field()
  @MinLength(1)
  @MaxLength(36)
  street: string;

  @IsPostalCode('SE', {
    message: 'Enter a postal code with 5 digits (e.g., 44233)',
  })
  @Field()
  postalCode: string;
}
