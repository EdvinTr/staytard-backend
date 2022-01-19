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
import { CreateProductInput } from './dto/create-product-input.dto';
import { GetProductsInput } from './dto/get-products-input.dto';
import { QueryProductsOutput } from './dto/query-products-output.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @ResolveField(() => String)
  public async priceLabel(@Parent() product: Product) {
    return `${product.unitPrice} EUR`;
  }

  @Query(() => QueryProductsOutput)
  public async products(
    @Args('input') input: GetProductsInput,
  ): Promise<QueryProductsOutput> {
    const { products, count } = await this.productService.findAll(input);
    return {
      items: products,
      totalCount: count,
      hasMore: count - input.offset > input.limit,
    };
  }

  @UseGuards(PermissionGuard(Permission.CREATE_PRODUCT))
  @Mutation(() => Product)
  public async createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.create(input);
  }
}
