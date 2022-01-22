import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { FindProductsDto } from './dto/find-products.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Req() req: Request) {
    const query = req.query as unknown as FindProductsDto;
    const limit = query.limit || 50;
    const page = query.page || 1;
    const categoryPath = query.categoryPath || '';
    const sortBy = query.sortBy;
    const sortDirection = query.sortDirection;
    return this.productService.restFindAll({
      categoryPath,
      limit,
      page,
      sortBy,
      sortDirection,
    });
  }
}
