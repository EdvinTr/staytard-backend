import { Resolver } from '@nestjs/graphql';
import { StripePaymentService } from './stripe-payment.service';

@Resolver()
export class StripePaymentResolver {
  constructor(private readonly stripePaymentService: StripePaymentService) {}

  /* @Mutation(() => Stripe.Stripe.Checkout.SessionsResource)
  async createStripeSession(@Args('input') input: PayWithStripeInput) {
    return this.stripePaymentService.createSession();
  } */
}
