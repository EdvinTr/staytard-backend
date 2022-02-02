import { UseGuards } from '@nestjs/common';
import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @Mutation(() => String)
  async testCreateCustomerOrder() {
    return this.customerOrderService.create(
      {
        city: 'test',
        deliveryAddress: 'test',
        orderItems: [
          { productId: 823, sku: 'PAPN-WHI-L4', quantity: 3 },
          { productId: 487, sku: 'JSHJ-WHI-S5', quantity: 22 },
        ],
        orderNumber: 'test',
        paymentType: 'card',
        postalCode: '75645',
        purchaseCurrency: 'SEK',
        totalAmount: 100,
      },
      'userId',
    );
  }
}
