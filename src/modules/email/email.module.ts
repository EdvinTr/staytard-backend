import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailResolver } from './email.resolver';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService, ConfigService, EmailResolver],
  exports: [EmailService],
})
export class EmailModule {}
