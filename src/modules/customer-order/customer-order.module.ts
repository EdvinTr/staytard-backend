import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { CustomerOrderResolver } from './customer-order.resolver';
import { CustomerOrderService } from './customer-order.service';
import { CustomerOrderStatus } from './entities/customer-order-status.entity';
import { CustomerOrder } from './entities/customer-order.entity';

@Module({
  providers: [CustomerOrderResolver, CustomerOrderService],
  imports: [
    TypeOrmModule.forFeature([CustomerOrder]),
    TypeOrmModule.forFeature([CustomerOrderStatus]),
    ProductModule,
    HttpModule,
  ],
  exports: [CustomerOrderService],
})
export class CustomerOrderModule {}
