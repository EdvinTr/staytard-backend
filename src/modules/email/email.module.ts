import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService, ConfigService],
  controllers: [EmailController],
  exports: [EmailService],
  imports: [UserModule],
})
export class EmailModule {}
