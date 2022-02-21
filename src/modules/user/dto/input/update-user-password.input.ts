import { Field, InputType } from '@nestjs/graphql';
import IsValidPassword from '../../../../utils/validation/is-valid-password.decorator';

@InputType()
export class UpdateUserPasswordInput {
  @Field({ nullable: true })
  oldPassword?: string;

  @Field()
  @IsValidPassword('newPassword')
  newPassword: string;
}
