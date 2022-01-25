import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CustomerOrderService } from './customer-order.service';
import { CreateCustomerOrderInput } from './dto/create-customer-order.input';
import { CustomerOrder } from './entities/customer-order.entity';

@Resolver(() => CustomerOrder)
export class CustomerOrderResolver {
  constructor(private readonly customerOrderService: CustomerOrderService) {}

  @Mutation(() => CustomerOrder)
  createCustomerOrder(
    @Args('createCustomerOrderInput')
    createCustomerOrderInput: CreateCustomerOrderInput,
  ) {
    return this.customerOrderService.create(createCustomerOrderInput);
  }
}
