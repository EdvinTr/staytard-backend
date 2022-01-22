import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Req() req: Request) {
    const limit = req.query.limit || 50;
    const page = req.query.page || 1;
    const categoryPath = req.query.categoryPath || '';

    return this.productService.restFindAll({
      limit: +limit,
      page: +page,
      categoryPath: categoryPath as string,
    });
  }
}
