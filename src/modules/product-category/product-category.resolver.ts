import { Args, Query, Resolver } from '@nestjs/graphql';
import { IsNull, Not } from 'typeorm';
import { BasicCategory } from './dto/basic-category';
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

  @Query(() => [BasicCategory])
  async basicCategories(): Promise<BasicCategory[]> {
    return this.productCategoryService.findCategories({
      relations: [
        'children',
        'children.children',
        'children.children.children',
      ],
      where: {
        parent: Not(IsNull()),
      },
      order: {
        name: 'ASC',
      },
      select: ['id', 'name'],
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
