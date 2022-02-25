import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from '../authentication/guards/graphql-jwt-auth.guard';
import RequestWithUser from '../authentication/interfaces/request-with-user.interface';
import { CustomerOrder } from '../customer-order/entities/customer-order.entity';
import { StripePaymentService } from './stripe-payment.service';

@Resolver()
export class StripePaymentResolver {
  constructor(private readonly stripePaymentService: StripePaymentService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => CustomerOrder)
  async createCustomerOrderWithStripe(
    @Args('stripeSessionId') stripeSessionId: string,
    @Context() { req }: { req: RequestWithUser },
  ) {
    return await this.stripePaymentService.createOrGetCustomerOrder(
      stripeSessionId,
      req.user.id,
    );
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Query(() => CustomerOrder)
  async findCustomerOrderByStripeId(
    @Args('stripeSessionId') stripeSessionId: string,
    @Context() { req }: { req: RequestWithUser },
  ) {
    return await this.stripePaymentService.findOne(stripeSessionId);
  }
}
