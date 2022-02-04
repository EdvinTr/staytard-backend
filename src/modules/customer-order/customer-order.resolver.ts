import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from '../authentication/guards/graphql-jwt-auth.guard';
import RequestWithUser from '../authentication/interfaces/request-with-user.interface';
import { CustomerOrderService } from './customer-order.service';
import { FindCustomerOrdersInput } from './dto/find-customer-orders.input';
import { PaginatedCustomerOrdersOutput } from './dto/paginated-customer-orders.output';
import { CustomerOrder } from './entities/customer-order.entity';

@Resolver(() => CustomerOrder)
export class CustomerOrderResolver {
  constructor(private readonly customerOrderService: CustomerOrderService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Query(() => PaginatedCustomerOrdersOutput)
  async customerOrders(
    @Context() { req }: { req: RequestWithUser },
    @Args('input') input: FindCustomerOrdersInput,
  ): Promise<PaginatedCustomerOrdersOutput> {
    return this.customerOrderService.findAll(req.user.id, input);
  }
}
