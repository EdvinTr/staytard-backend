import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KlarnaPaymentResolver } from './klarna-payment.resolver';
import { KlarnaPaymentService } from './klarna-payment.service';
@Module({
  providers: [KlarnaPaymentResolver, KlarnaPaymentService],
  imports: [HttpModule],
  exports: [KlarnaPaymentService],
})
export class KlarnaPaymentModule {}
