import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SendEmailInput } from './dto/send-email.input';
import { EmailService } from './email.service';

@Resolver()
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => Boolean)
  async sendEmail(@Args('input') input: SendEmailInput) {
    return this.emailService.sendMail(input);
  }
}
