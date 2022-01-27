import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendEmailInput {
  @Field()
  to: string;

  @Field()
  text: string;

  @Field()
  subject: string;
}
