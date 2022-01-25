import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductOrderInput } from './dto/create-product-order.input';
import { ProductOrder } from './entities/product-order.entity';
import { ProductOrderService } from './product-order.service';

@Resolver(() => ProductOrder)
export class ProductOrderResolver {
  constructor(private readonly productOrderService: ProductOrderService) {}

  @Mutation(() => ProductOrder)
  createProductOrder(
    @Args('createProductOrderInput')
    createProductOrderInput: CreateProductOrderInput,
  ) {
    return this.productOrderService.create(createProductOrderInput);
  }
}
