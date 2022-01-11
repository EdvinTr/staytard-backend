import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ProductCategory } from './entities/product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async findCategories(options?: FindManyOptions<ProductCategory>) {
    return this.productCategoryRepository.find({ ...options });
  }

  async findOne(options?: FindOneOptions<ProductCategory>) {
    return this.productCategoryRepository.findOne(options);
  }
}
