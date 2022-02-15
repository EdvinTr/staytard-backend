import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomerOrderService } from '../customer-order/customer-order.service';
import { CustomerOrder } from '../customer-order/entities/customer-order.entity';
import { InitKlarnaSessionInput } from './dto/init-klarna-session.input';
import { AuthorizeKlarnaResponse } from './typings/authorize-klarna-response';
import { KlarnaSessionResponse } from './typings/klarna-session-response';

@Injectable()
export class KlarnaPaymentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly customerOrderService: CustomerOrderService,
  ) {}

  public async createCustomerOrder(
    input: InitKlarnaSessionInput,
    authorizationToken: string,
    userId: string,
  ): Promise<CustomerOrder> {
    try {
      const response = await this.httpService
        .post<AuthorizeKlarnaResponse>(
          `https://api.playground.klarna.com/payments/v1/authorizations/${authorizationToken}/order`,
          {
            ...input,
            merchant_urls: {
              confirmation: `${process.env.FRONTEND_URL}/confirmation/${authorizationToken}`, // TODO: should probably not place this token in URL
            },
          },
          {
            auth: {
              username: process.env.KLARNA_API_USERNAME,
              password: process.env.KLARNA_API_PASSWORD,
            },
          },
        )
        .toPromise();

      if (
        !response ||
        !response.data ||
        response.data.fraud_status !== 'ACCEPTED'
      ) {
        throw new Error();
      }
      const paymentType = response.data.authorized_payment_method.type;
      const {
        billing_address,
        order_amount,
        order_lines,
        order_tax_amount,
        purchase_currency,
      } = input;

      const customerOrder = await this.customerOrderService.create(
        {
          city: billing_address.city,
          deliveryAddress: billing_address.street_address,
          postalCode: billing_address.postal_code,
          orderNumber: response.data.order_id,
          orderItems: [
            ...order_lines.map((line) => ({
              productId: line.productId,
              quantity: line.quantity,
              sku: line.sku,
            })),
          ],
          totalAmount: order_amount + order_tax_amount, // Klarna calculates the total amount correctly based on the order lines
          paymentType,
          purchaseCurrency: purchase_currency,
        },
        userId,
      );

      return customerOrder;
    } catch (err: any) {
      console.log(err);
      if (err?.response?.status === 400) {
        throw new BadRequestException(err.response.data.message);
      }
      throw new InternalServerErrorException(
        'Could not authorize Klarna payment',
      );
    }
  }
  public async initializeKlarnaSession(input: InitKlarnaSessionInput) {
    try {
      const sessionEndpoint =
        'https://api.playground.klarna.com/payments/v1/sessions';
      const response = await this.httpService
        .post<KlarnaSessionResponse>(
          sessionEndpoint,
          { ...input },
          {
            auth: {
              username: process.env.KLARNA_API_USERNAME,
              password: process.env.KLARNA_API_PASSWORD,
            },
          },
        )
        .toPromise();
      if (!response || !response.data) {
        throw new Error();
      }
      const { client_token, payment_method_categories, session_id } =
        response.data;

      return {
        client_token,
        payment_method_categories,
        session_id,
      };
    } catch (err: any) {
      console.log(err);
      if (err?.response?.status === 400) {
        throw new BadRequestException(err.response.data.message);
      }
      throw new InternalServerErrorException(
        'Could not establish a credit session with Klarna',
      );
    }
  }
}
