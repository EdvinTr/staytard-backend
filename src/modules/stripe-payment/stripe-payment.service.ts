import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CustomerOrderService } from '../customer-order/customer-order.service';
import { CreateStripeSessionDto } from './dto/create-stripe-session.dto';
@Injectable()
export class StripePaymentService {
  public stripe;
  constructor(private readonly customerOrderService: CustomerOrderService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
  }

  async retrieveSessionDetails(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    if (!session || !session.customer) {
      return null;
    }
    const customer = await this.stripe.customers.retrieve(
      session.customer as string,
    );
    const lineItems = await this.stripe.checkout.sessions.listLineItems(
      session.id,
    );
    const prods = await this.stripe.products.retrieve(
      lineItems.data[0].price?.product as string,
    );
    console.log(lineItems);
    return {
      prods,
      session,
      lineItems,
    };
  }
  async test() {
    return this.stripe.orders.retrieve('');
  }
  // TODO: should receive input from frontend cart with products
  async createSession(data: CreateStripeSessionDto) {
    return await this.stripe.checkout.sessions.create({
      line_items: [...data.orderLines],

      payment_method_types: ['card'],
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['SE'],
      },
      cancel_url: process.env.FRONTEND_URL + '/checkout',
      success_url:
        process.env.FRONTEND_URL +
        '/order/success?session_id={CHECKOUT_SESSION_ID}',
    });
  }
  /*   async pay({ paymentIntentId, paymentMethodId }: PayWithStripeInput) {
    try {
      let intent: Stripe.PaymentIntent | null = null;
      if (paymentMethodId) {
        intent = await this.stripe.paymentIntents.create({
          payment_method: paymentMethodId,
          amount: 1000,
          currency: 'usd',
          confirmation_method: 'manual',
          confirm: true,
          receipt_email: 'edvin.tronnberg@gmail.com',
        });
      } else if (paymentIntentId) {
        intent = await this.stripe.paymentIntents.confirm(paymentIntentId);
      }
      if (!intent) {
        throw new Error();
      }
      const res = await this.generateResponse(intent);
      return res;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async generateResponse(
    intent: Stripe.PaymentIntent,
  ): Promise<PayWithStripeResponseOutput> {
    // Note that if your API version is before 2019-02-11, 'requires_action'
    // appears as 'requires_source_action'.
    if (
      intent.status === 'requires_action' &&
      intent.next_action?.type === 'use_stripe_sdk'
    ) {
      // Tell the client to handle the action
      return {
        requires_action: true,
        payment_intent_client_secret: intent.client_secret || undefined,
      };
    } else if (intent.status === 'succeeded') {
      // The payment didn’t need any additional actions and completed!
      // Handle post-payment fulfillment
      return {
        success: true,
      };
    } else {
      // Invalid status
      return {
        error: 'Invalid PaymentIntent status',
      };
    }
  } */
}
