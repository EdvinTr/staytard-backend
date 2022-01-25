import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  providers: [ProductResolver, ProductService],
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
