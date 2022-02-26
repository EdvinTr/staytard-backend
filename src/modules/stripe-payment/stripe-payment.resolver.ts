import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from '../authentication/guards/graphql-jwt-auth.guard';
import RequestWithUser from '../authentication/interfaces/request-with-user.interface';
import { CreateOrGetOrderWithStripeOutput } from './dto/output/create-order-with-stripe.output';
import { StripePaymentService } from './stripe-payment.service';

@Resolver()
export class StripePaymentResolver {
  constructor(private readonly stripePaymentService: StripePaymentService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => CreateOrGetOrderWithStripeOutput)
  async createOrGetCustomerOrderWithStripe(
    @Args('stripeSessionId') stripeSessionId: string,
    @Context() { req }: { req: RequestWithUser },
  ): Promise<CreateOrGetOrderWithStripeOutput> {
    return await this.stripePaymentService.createOrGetCustomerOrder(
      stripeSessionId,
      req.user.id,
    );
  }
}
