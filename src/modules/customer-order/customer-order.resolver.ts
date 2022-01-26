import { UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from '../authentication/guards/graphql-jwt-auth.guard';
import RequestWithUser from '../authentication/interfaces/request-with-user.interface';
import { CustomerOrderService } from './customer-order.service';
import { CustomerOrder } from './entities/customer-order.entity';

@Resolver(() => CustomerOrder)
export class CustomerOrderResolver {
  constructor(private readonly customerOrderService: CustomerOrderService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Query(() => [CustomerOrder])
  async customerOrders(
    @Context() { req }: { req: RequestWithUser },
  ): Promise<CustomerOrder[]> {
    return this.customerOrderService.findAll(req.user.id);
  }
}
