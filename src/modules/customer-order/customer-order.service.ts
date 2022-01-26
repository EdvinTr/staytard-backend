import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { CreateCustomerOrderInput } from './dto/create-customer-order.input';
import { CustomerOrderStatus } from './entities/customer-order-status.entity';
import { CustomerOrder } from './entities/customer-order.entity';
import { KlarnaSessionResponse } from './typings/klarna-session-response';
import { ORDER_STATUS } from './typings/order-status.enum';

export enum REGION {
  EU = '',
  US = '-na',
  OCEANIA = '-oc',
}

@Injectable()
export class CustomerOrderService {
  constructor(
    @InjectRepository(CustomerOrder)
    private readonly customerOrderRepository: Repository<CustomerOrder>,
    @InjectRepository(CustomerOrderStatus)
    private readonly orderStatusRepository: Repository<CustomerOrderStatus>,
    private readonly productService: ProductService,
    private readonly httpService: HttpService,
  ) {}

  public async placeOrderWithKlarna(authorizationToken: string) {
    try {
      // cart, billing and shipping information must be the same as in the authorization call made in the frontend
      const response = this.httpService.post(
        `https://api-na.playground.klarna.com/payments/v1/authorizations/${authorizationToken}/order`,
      );
    } catch (err) {}
  }

  public async initializeKlarnaSession() {
    // TODO:
    // 1. refactor to Klarna module
    // 2. Should receive this body as argument
    try {
      const body = {
        purchase_country: 'US',
        purchase_currency: 'USD',
        locale: 'en-US',
        order_amount: 20000,
        order_tax_amount: 0,
        order_lines: [
          {
            name: 'black T-Shirt',
            quantity: 2,
            unit_price: 5000,
            tax_rate: 0,
            total_amount: 10000,
            total_discount_amount: 0,
            total_tax_amount: 0,
            product_url: 'https://www.estore.com/products/f2a8d7e34',
            image_url: 'https://www.estore.com/product_image.png',
          },
          {
            name: 'red trousers',
            quantity: 1,
            unit_price: 10000,
            tax_rate: 0,
            total_amount: 10000,
            total_discount_amount: 0,
            total_tax_amount: 0,
            product_url: 'https://www.estore.com/products/f2a8d7e34',
            image_url: 'https://www.estore.com/product_image.png',
          },
        ],
        billing_address: {
          given_name: 'Jane',
          family_name: 'Doe',
          email: 'jane@doe.com',
          title: 'Ms',
          street_address: '512 City Park Ave',
          postal_code: '43215',
          city: 'Columbus',
          region: 'oh',
          phone: '6142607295',
          country: 'US',
        },
      };
      const sessionEndpoint =
        'https://api-na.playground.klarna.com/payments/v1/sessions';
      const response = await this.httpService
        .post<KlarnaSessionResponse>(
          sessionEndpoint,
          { ...body },
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

      console.log(payment_method_categories);

      return {
        client_token,
        payment_method_categories,
        session_id,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Could not establish a credit session with Klarna',
      );
    }
  }
  public async create(
    { orderItems, ...rest }: CreateCustomerOrderInput,
    userId: string,
  ) {
    const inputProductIds = orderItems.map((item) => item.productId);
    try {
      // find all the associated products
      const products = await this.productService.findByIds(inputProductIds);
      if (products.length !== inputProductIds.length) {
        const dbProductIds = products.map((product) => product.id);
        const idsNotFound = inputProductIds.filter(
          (inputProductId) => !dbProductIds.includes(inputProductId),
        );
        throw new NotFoundException(
          `Product(s) with id(s): [${idsNotFound}] was not found`,
        );
      }

      const pendingOrderStatus = await this.orderStatusRepository.findOne({
        where: { status: ORDER_STATUS.PENDING },
      });

      // TODO: should also calculate the discount for each product
      // calculate the total price of products
      const totalAmount = orderItems.reduce((acc, item) => {
        const product = products.find(
          (product) => product.id === item.productId,
        );
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        acc += item.quantity * product!.unitPrice;
        return acc;
      }, 0);

      const customerOrder = this.customerOrderRepository.create({
        ...rest,
        userId,
        shippingCost: 5,
        totalAmount: totalAmount, // total price based upon products and their quantity,
        orderStatus: pendingOrderStatus,
        orderItems: orderItems.map((item) => ({ ...item })),
      });
      return this.customerOrderRepository.save(customerOrder);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
