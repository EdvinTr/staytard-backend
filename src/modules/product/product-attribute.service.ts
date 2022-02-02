import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { ProductAttribute } from './entities/product-attribute.entity';

@Injectable()
export class ProductAttributeService {
  constructor(
    @InjectRepository(ProductAttribute)
    private readonly productAttributeRepository: Repository<ProductAttribute>,
  ) {}
  public async find(
    options?: FindManyOptions<ProductAttribute>,
  ): Promise<ProductAttribute[]> {
    return this.productAttributeRepository.find(options);
  }
}
