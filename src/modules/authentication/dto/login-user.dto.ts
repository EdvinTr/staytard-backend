import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class LoginUserDto {
  @IsEmail({}, { message: 'Email address is invalid' })
  @Field()
  email: string;

  @Field()
  password: string;
}
