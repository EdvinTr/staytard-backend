import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DeleteUserInput {
  @Field()
  @IsUUID()
  userId: string; // the ID of the user to delete

  @Field()
  password: string; // password of the user who is sending the request
}
