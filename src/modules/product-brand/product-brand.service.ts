import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { ProductBrand } from './entities/product-brand.entity';

@Injectable()
export class ProductBrandService {
  constructor(
    @InjectRepository(ProductBrand)
    private readonly productBrandRepository: Repository<ProductBrand>,
  ) {}

  async findAll(
    options?: FindManyOptions<ProductBrand>,
  ): Promise<ProductBrand[]> {
    return await this.productBrandRepository.find({ ...options });
  }
}
