import { Controller, Get } from '@nestjs/common';
import { ProductBrandService } from './product-brand.service';

@Controller('brands')
export class ProductBrandController {
  constructor(private readonly productBrandService: ProductBrandService) {}

  @Get()
  async findAll() {
    return await this.productBrandService.findAllGroupedByFirstCharacter();
  }
}
