import { Module } from '@nestjs/common';
import { ProductOrderService } from './product-order.service';
import { ProductOrderResolver } from './product-order.resolver';

@Module({
  providers: [ProductOrderResolver, ProductOrderService]
})
export class ProductOrderModule {}
