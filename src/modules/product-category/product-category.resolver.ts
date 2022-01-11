import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/product-category.entity';
import { ProductCategoryService } from './product-category.service';

@Resolver(ProductCategory)
export class ProductCategoryResolver {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  /*   @ResolveField(() => String)
  async getFullDescription(@Parent() { id }: ProductCategory) {
    const category = await this.productCategoryService.findOne({
      where: { id },
    });
    return category?.description;
  } */
  @Query(() => [ProductCategory])
  async getCategories() {
    return this.productCategoryService.findCategories({
      relations: ['children'],
      where: {
        parent: null,
      },
    });
  }
  @Query(() => ProductCategory)
  async getOneCategory(@Args('slug') slug: string) {
    return this.productCategoryService.findOne({
      relations: ['children', 'children.children'],
      where: {
        slug,
      },
    });
  }
}
