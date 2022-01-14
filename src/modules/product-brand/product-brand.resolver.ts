import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetProductBrandsInput } from './dto/get-product-brands.dto';
import { ProductBrand } from './entities/product-brand.entity';
import { ProductBrandService } from './product-brand.service';

@Resolver(() => ProductBrand)
export class ProductBrandResolver {
  constructor(private readonly productBrandService: ProductBrandService) {}

  @Query(() => [ProductBrand], { name: 'productBrands' })
  async getProductBrands(@Args('input') input: GetProductBrandsInput) {
    return await this.productBrandService.findAll({
      order: {
        [input.sortBy || 'id']: input.sortDirection || 'ASC',
      },
      cache: {
        id: 'product-brands',
        milliseconds: 300000, // 5 minutes
      },
    });
  }
}
