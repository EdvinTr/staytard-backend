import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttribute } from './entities/product-attribute.entity';
import { Product } from './entities/product.entity';
import { ProductAttributeService } from './product-attribute.service';
import { ProductController } from './product.controller';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  providers: [ProductResolver, ProductService, ProductAttributeService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([ProductAttribute]),
  ],
  controllers: [ProductController],
  exports: [ProductService, ProductAttributeService],
})
export class ProductModule {}
