import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import Permission from '../../lib/permission/permission.type';
import { GraphqlJwtAuthGuard } from '../authentication/guards/graphql-jwt-auth.guard';
import PermissionGuard from '../authentication/guards/permission.guard';
import RequestWithUser from '../authentication/interfaces/request-with-user.interface';
import { CustomerOrderService } from './customer-order.service';
import { FindAllCustomerOrdersInput } from './dto/input/find-all-customer-orders.input';
import { FindMyCustomerOrdersInput } from './dto/input/find-my-customer-orders.input';
import { UpdateCustomerOrderInput } from './dto/input/update-customer-order.input';
import { FindOneCustomerOrderOutput } from './dto/output/find-one-customer-order.output';
import { PaginatedCustomerOrdersOutput } from './dto/output/paginated-customer-orders.output';

@Resolver(() => FindOneCustomerOrderOutput)
export class CustomerOrderResolver {
  constructor(private readonly customerOrderService: CustomerOrderService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Query(() => PaginatedCustomerOrdersOutput)
  async myOrders(
    @Context() { req }: { req: RequestWithUser },
    @Args('input') input: FindMyCustomerOrdersInput,
  ): Promise<PaginatedCustomerOrdersOutput> {
    return this.customerOrderService.findMyCustomerOrders(req.user.id, input);
  }

  @UseGuards(PermissionGuard(Permission.READ_CUSTOMER_ORDER))
  @Query(() => PaginatedCustomerOrdersOutput)
  async customerOrders(
    @Args('input') input: FindAllCustomerOrdersInput,
  ): Promise<PaginatedCustomerOrdersOutput> {
    return this.customerOrderService.findAll(input);
  }

  @UseGuards(PermissionGuard(Permission.UPDATE_CUSTOMER_ORDER))
  @Mutation(() => Boolean)
  async updateCustomerOrder(
    @Args('input') input: UpdateCustomerOrderInput,
  ): Promise<boolean> {
    return this.customerOrderService.update(input);
  }

  @UseGuards(PermissionGuard(Permission.READ_CUSTOMER_ORDER))
  @UseGuards(PermissionGuard(Permission.READ_USER))
  @Query(() => FindOneCustomerOrderOutput)
  async oneCustomerOrder(
    @Args('id') id: number,
  ): Promise<FindOneCustomerOrderOutput> {
    return this.customerOrderService.findOne(id);
  }
}
