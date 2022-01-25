import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from '../authentication/guards/graphql-jwt-auth.guard';
import RequestWithUser from '../authentication/interfaces/request-with-user.interface';
import { CustomerOrderService } from './customer-order.service';
import { CreateCustomerOrderInput } from './dto/create-customer-order.input';
import { CustomerOrder } from './entities/customer-order.entity';

@Resolver(() => CustomerOrder)
export class CustomerOrderResolver {
  constructor(private readonly customerOrderService: CustomerOrderService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => CustomerOrder)
  createCustomerOrder(
    @Context() { req }: { req: RequestWithUser },
    @Args('input')
    input: CreateCustomerOrderInput,
  ) {
    const userId = req.user.id;
    return this.customerOrderService.create(input, userId);
  }
}
