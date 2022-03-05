import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBrand } from './entities/product-brand.entity';
import { ProductBrandController } from './product-brand.controller';
import { ProductBrandResolver } from './product-brand.resolver';
import { ProductBrandService } from './product-brand.service';

@Module({
  providers: [ProductBrandResolver, ProductBrandService],
  imports: [TypeOrmModule.forFeature([ProductBrand])],
  exports: [ProductBrandService],
  controllers: [ProductBrandController],
})
export class ProductBrandModule {}
