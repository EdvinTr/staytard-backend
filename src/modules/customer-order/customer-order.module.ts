import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { CustomerOrderResolver } from './customer-order.resolver';
import { CustomerOrderService } from './customer-order.service';
import { CustomerOrderStatus } from './entities/customer-order-status.entity';
import { CustomerOrder } from './entities/customer-order.entity';

@Module({
  providers: [CustomerOrderService, CustomerOrderResolver],
  imports: [
    TypeOrmModule.forFeature([CustomerOrder]),
    TypeOrmModule.forFeature([CustomerOrderStatus]),
    ProductModule,
  ],
  exports: [CustomerOrderService],
})
export class CustomerOrderModule {}
