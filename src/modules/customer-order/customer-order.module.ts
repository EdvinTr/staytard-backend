import { Module } from '@nestjs/common';
import { CustomerOrderResolver } from './customer-order.resolver';
import { CustomerOrderService } from './customer-order.service';

@Module({
  providers: [CustomerOrderResolver, CustomerOrderService],
})
export class CustomerOrderModule {}
