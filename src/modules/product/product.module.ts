import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttribute } from './entities/product-attribute.entity';
import { ProductColor } from './entities/product-color.entity';
import { ProductImage } from './entities/product-image.entity';
import { ProductSize } from './entities/product-size.entity';
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
    TypeOrmModule.forFeature([ProductColor]),
    TypeOrmModule.forFeature([ProductSize]),
    TypeOrmModule.forFeature([ProductImage]),
  ],
  controllers: [ProductController],
  exports: [ProductService, ProductAttributeService],
})
export class ProductModule {}
