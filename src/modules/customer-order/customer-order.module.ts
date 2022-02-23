import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '../email/email.module';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
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
    EmailModule,
    UserModule,
  ],
  exports: [CustomerOrderService],
})
export class CustomerOrderModule {}
