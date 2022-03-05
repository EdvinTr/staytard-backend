import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GetProductBrandsDto,
  SortedBrandKey,
} from './dto/get-product-brand.dto';
import { ProductBrand } from './entities/product-brand.entity';

@Injectable()
export class ProductBrandService {
  constructor(
    @InjectRepository(ProductBrand)
    private readonly productBrandRepository: Repository<ProductBrand>,
  ) {}

  async findAll(): Promise<GetProductBrandsDto> {
    const [brands, count] = await this.productBrandRepository.findAndCount({
      cache: 300000, // 5min
    });
    const sortedByKeys: GetProductBrandsDto['brands'] = {};
    for (const brand of brands) {
      let key = brand.name[0]
        .toLowerCase()
        .normalize('NFD') //
        .replace(/\p{Diacritic}/gu, '') as SortedBrandKey;
      if (!isNaN(+key)) {
        key = '#'; // store brands starting with numbers in a separate key
      }
      sortedByKeys[key] = [...(sortedByKeys[key] || []), brand];
    }
    return {
      count,
      brands: {
        ...sortedByKeys,
      },
    };
  }
}
