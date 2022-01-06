import { Resolver } from '@nestjs/graphql';
import { ProductCategoryService } from './product-category.service';

@Resolver()
export class ProductCategoryResolver {
  constructor(private readonly productCategoryService: ProductCategoryService) {}
}
