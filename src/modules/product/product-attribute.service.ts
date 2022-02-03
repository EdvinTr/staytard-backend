import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
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

  public async update(
    criteria: FindConditions<ProductAttribute>,
    partialEntity: QueryDeepPartialEntity<ProductAttribute>,
  ) {
    return this.productAttributeRepository.update(criteria, partialEntity);
  }
}
