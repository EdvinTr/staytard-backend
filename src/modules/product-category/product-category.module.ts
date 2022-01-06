import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { ProductCategoryResolver } from './product-category.resolver';
import { ProductCategoryService } from './product-category.service';

@Module({
  providers: [ProductCategoryResolver, ProductCategoryService],
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  exports: [ProductCategoryService],
})
export class ProductCategoryModule {}
