import { Controller, Get, Query } from '@nestjs/common';
import { FindProductsDto } from './dto/find-products.dto';
import { ProductService } from './product.service';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Query() query: FindProductsDto) {
    return this.productService.restFindAll({
      ...query,
    });
  }
}
