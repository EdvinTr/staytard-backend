import { Query, Resolver } from '@nestjs/graphql';
import { ProductBrand } from './entities/product-brand.entity';
import { ProductBrandService } from './product-brand.service';

@Resolver(() => ProductBrand)
export class ProductBrandResolver {
  constructor(private readonly productBrandService: ProductBrandService) {}

  @Query(() => [ProductBrand], { name: 'productBrands' })
  async getProductBrands() {
    return await this.productBrandService.findAll();
  }
}
