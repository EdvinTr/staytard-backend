import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('send-email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendMailOrSomething(@Body() body: any) {
    await this.emailService.sendTestMail(body.userId);
  }
}
