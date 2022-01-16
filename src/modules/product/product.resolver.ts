import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductPermission } from '../../lib/permission/enums/product-permission.enum';
import PermissionGuard from '../authentication/guards/permission.guard';
import { CreateProductInput } from './dto/create-product-input.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @UseGuards(PermissionGuard(ProductPermission.CREATE_PRODUCT))
  @Mutation(() => Product)
  async createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.create(input);
  }
}
