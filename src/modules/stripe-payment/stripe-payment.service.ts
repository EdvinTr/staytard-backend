import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { v4 } from 'uuid';
import { CustomerOrderService } from '../customer-order/customer-order.service';
import { OrderItemInput } from '../customer-order/dto/input/create-customer-order.input';
import { CreateStripeSessionDto } from './dto/create-stripe-session.dto';
@Injectable()
export class StripePaymentService {
  public stripe;
  constructor(private readonly customerOrderService: CustomerOrderService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
  }
  // TODO:
  // Should have function createOrderFromSession
  // Should check in database if the order is already created
  // If it is, just throw an error saying it has already been created or return the order and display in frontend (check calling user has privilege or is admin)
  // else create the order and save it to the database

  async findOne(stripeSessionId: string) {
    return await this.customerOrderService.findOneWithArgs({
      where: {
        stripeSessionId,
      },
      relations: [
        'orderItems',
        'orderItems.product',
        'orderItems.product.brand',
      ],
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
    ); // TODO: grab all skus and add to order and save
    console.log(lineItems);
    return {
      session,
    };
  }
  async createOrGetCustomerOrder(sessionId: string, userId: string) {
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
        ],
      });
      if (customerOrder) {
        return customerOrder;
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
      return await this.customerOrderService.findOne(order.id);
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
        '/order/stripe/success?session_id={CHECKOUT_SESSION_ID}',
    });
  }
}
