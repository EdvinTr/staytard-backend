import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import Stripe from 'stripe';
import { v4 } from 'uuid';
import { CustomerOrderService } from '../customer-order/customer-order.service';
import { OrderItemInput } from '../customer-order/dto/input/create-customer-order.input';
import { CreateStripeSessionDto } from './dto/create-stripe-session.dto';
import { CreateOrGetOrderWithStripeOutput } from './dto/output/create-order-with-stripe.output';
@Injectable()
export class StripePaymentService {
  public stripe;
  constructor(private readonly customerOrderService: CustomerOrderService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
  }
  async createOrGetCustomerOrder(
    sessionId: string,
    userId: string,
  ): Promise<CreateOrGetOrderWithStripeOutput> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      if (!session) {
        throw new BadRequestException('Stripe session ID is invalid');
      }
      const customerOrder = await this.customerOrderService.findOneWithArgs({
        where: {
          stripeSessionId: session.id,
        },
        relations: [
          'orderItems',
          'orderItems.product',
          'orderItems.product.brand',
          'user',
        ],
      });
      if (customerOrder) {
        if (customerOrder.userId !== userId) {
          throw new ForbiddenException(
            "You are not allowed to view other user's orders",
          );
        }
        return {
          wasCreated: false,
          user: customerOrder.user,
          order: customerOrder,
        };
      }
      const shippingDetails = session.shipping?.address;
      if (
        !shippingDetails ||
        !shippingDetails.line1 ||
        !shippingDetails.city ||
        !shippingDetails.country ||
        !shippingDetails.postal_code
      ) {
        throw new BadRequestException(
          "Stripe session doesn't have shipping details",
        );
      }
      const lineItems = await this.stripe.checkout.sessions.listLineItems(
        session.id,
      );

      const products = [];
      for (let i = 0; i < lineItems.data.length; i++) {
        const line = lineItems.data[i];
        const item = line.price?.product;
        const quantity = line.quantity;
        if (!item || !quantity) {
          throw new BadRequestException(
            'Stripe session has invalid line items',
          );
        }
        const product = await this.stripe.products.retrieve(item as string);
        products.push({
          product,
          quantity,
        });
      }
      const order = await this.customerOrderService.create(
        {
          orderNumber: v4(),
          city: shippingDetails.city,
          stripeSessionId: session.id,
          deliveryAddress: shippingDetails.line1,
          postalCode: shippingDetails.postal_code,
          paymentType: session.payment_method_types[0],
          purchaseCurrency: session.currency || 'EUR',
          totalAmount: session.amount_total ? session.amount_total / 100 : 0, // Should be some smarter logic for currency conversion but this will suffice for the project :)
          orderItems: [
            ...products.map((prod) => {
              return {
                productId: +prod.product.metadata.productId,
                sku: prod.product.metadata.sku,
                quantity: prod.quantity,
              };
            }),
          ],
        },
        userId,
      );
      const { order: savedCustomerOrder, user } =
        await this.customerOrderService.findOne(order.id);
      return {
        wasCreated: true,
        order: savedCustomerOrder,
        user,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async createSession(data: CreateStripeSessionDto) {
    const isInStock = await this.customerOrderService.checkStockAvailability([
      ...data.orderLines.map((line): OrderItemInput => {
        const { productId, sku } = line.price_data.product_data.metadata;
        return {
          productId,
          sku,
          quantity: line.quantity,
        };
      }),
    ]);
    if (!isInStock) {
      throw new BadRequestException(
        'Not enough stock available for one or more items',
      );
    }
    return await this.stripe.checkout.sessions.create({
      line_items: [...data.orderLines],
      payment_method_types: ['card'],
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['SE'],
      },
      metadata: {
        // ? add userId to metadata?
      },
      cancel_url: process.env.FRONTEND_URL + '/checkout',
      success_url:
        process.env.FRONTEND_URL +
        '/checkout/stripe/success?session_id={CHECKOUT_SESSION_ID}',
    });
  }
}
