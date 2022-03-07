import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindProductBrandsInput } from './dto/find-product-brands.input';
import { ProductBrand } from './entities/product-brand.entity';
import { ProductBrandService } from './product-brand.service';

@Resolver(() => ProductBrand)
export class ProductBrandResolver {
  constructor(private readonly productBrandService: ProductBrandService) {}

  @Query(() => [ProductBrand])
  async productBrands(@Args('input') input: FindProductBrandsInput) {
    return this.productBrandService.findAll(input);
  }
}
