import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/product-category.entity';
import { ProductCategoryService } from './product-category.service';

@Resolver(ProductCategory)
export class ProductCategoryResolver {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Query(() => [ProductCategory])
  async categories() {
    return this.productCategoryService.findCategories({
      relations: ['children'],
      where: {
        parent: null,
      },
    });
  }

  @Query(() => ProductCategory)
  async getOneCategory(@Args('path') path: string) {
    return this.productCategoryService.findOne({
      relations: ['children'],
      where: {
        path,
      },
    });
  }
}
