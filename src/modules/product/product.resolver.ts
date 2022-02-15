import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import Permission from '../../lib/permission/permission.type';
import PermissionGuard from '../authentication/guards/permission.guard';
import { CreateProductInput } from './dto/create-product.input';
import { FindProductsBySkusInput } from './dto/find-products-by-skus.input';
import { FindProductsInput } from './dto/find-products.input';
import { QueryProductsOutput } from './dto/query-products.output';
import { SearchProductsInput } from './dto/search-products.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @ResolveField(() => String)
  public async currentPriceLabel(@Parent() product: Product) {
    return `${product.currentPrice} EUR`;
  }

  @Query(() => [Product])
  public async searchProducts(@Args('input') input: SearchProductsInput) {
    return this.productService.searchByNameOrCategory(input);
  }

  @Query(() => QueryProductsOutput)
  public async products(
    @Args('input') input: FindProductsInput,
  ): Promise<QueryProductsOutput> {
    return this.productService.gqlFindAll(input);
  }

  @Query(() => Product)
  public async product(@Args('id') id: number) {
    return this.productService.findOne(id, {
      relations: ['category', 'brand'],
    });
  }

  @Query(() => QueryProductsOutput)
  public async productsBySku(@Args('input') input: FindProductsBySkusInput) {
    return this.productService.findBySkus(input);
  }

  @UseGuards(PermissionGuard(Permission.CREATE_PRODUCT))
  @Mutation(() => Product)
  public async createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.create(input);
  }

  @UseGuards(PermissionGuard(Permission.UPDATE_PRODUCT))
  @Mutation(() => Product)
  public async updateProduct(@Args('input') input: UpdateProductInput) {
    return this.productService.update(input);
  }

  @UseGuards(PermissionGuard(Permission.DELETE_PRODUCT))
  @Mutation(() => Boolean)
  public async deleteProduct(@Args('id') id: number): Promise<boolean> {
    return this.productService.delete(id);
  }
}
