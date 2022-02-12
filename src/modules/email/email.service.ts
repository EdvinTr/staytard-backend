import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      name: 'smtp.gmail.com',
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async sendMail(input: SendEmailDto, options?: Mail.Options) {
    try {
      await this.nodemailerTransport.sendMail({
        to: input.to,
        text: input.text,
        subject: input.subject,
        ...options,
      });
      return true;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException("Couldn't send email");
    }
  }
}
