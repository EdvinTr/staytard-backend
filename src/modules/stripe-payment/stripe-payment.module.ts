import { Module } from '@nestjs/common';
import { CustomerOrderModule } from '../customer-order/customer-order.module';
import { StripePaymentController } from './stripe-payment.controller';
import { StripePaymentResolver } from './stripe-payment.resolver';
import { StripePaymentService } from './stripe-payment.service';

@Module({
  providers: [StripePaymentService, StripePaymentResolver],
  exports: [StripePaymentService],
  imports: [CustomerOrderModule],
  controllers: [StripePaymentController],
})
export class StripePaymentModule {}
