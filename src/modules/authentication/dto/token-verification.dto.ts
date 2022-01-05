import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TokenVerificationDto {
  @Field()
  token: string;
}
