import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService, ConfigService],
  exports: [EmailService],
  imports: [UserModule],
})
export class EmailModule {}
