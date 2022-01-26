import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomerOrderModule } from '../customer-order/customer-order.module';
import { KlarnaPaymentResolver } from './klarna-payment.resolver';
import { KlarnaPaymentService } from './klarna-payment.service';
@Module({
  providers: [KlarnaPaymentResolver, KlarnaPaymentService],
  imports: [HttpModule, CustomerOrderModule],
  exports: [KlarnaPaymentService],
})
export class KlarnaPaymentModule {}
