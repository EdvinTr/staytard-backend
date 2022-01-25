import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerOrderResolver } from './customer-order.resolver';
import { CustomerOrderService } from './customer-order.service';
import { CustomerOrder } from './entities/customer-order.entity';

@Module({
  providers: [CustomerOrderResolver, CustomerOrderService],
  imports: [TypeOrmModule.forFeature([CustomerOrder])],
})
export class CustomerOrderModule {}
