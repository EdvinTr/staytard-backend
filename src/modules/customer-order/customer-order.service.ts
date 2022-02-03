import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductAttribute } from '../product/entities/product-attribute.entity';
import { ProductAttributeService } from '../product/product-attribute.service';
import { ProductService } from '../product/product.service';
import {
  CreateCustomerOrderInput,
  OrderItemInput,
} from './dto/create-customer-order.input';
import { CustomerOrderStatus } from './entities/customer-order-status.entity';
import { CustomerOrder } from './entities/customer-order.entity';
import { ORDER_STATUS } from './typings/order-status.enum';

@Injectable()
export class CustomerOrderService {
  constructor(
    @InjectRepository(CustomerOrder)
    private readonly customerOrderRepository: Repository<CustomerOrder>,
    @InjectRepository(CustomerOrderStatus)
    private readonly orderStatusRepository: Repository<CustomerOrderStatus>,
    private readonly productService: ProductService,
    private readonly productAttributeService: ProductAttributeService,
  ) {}

  public async findAll(userId: string) {
    return this.customerOrderRepository.find({
      where: { userId },
    });
  }

  public async create(
    { orderItems, ...rest }: CreateCustomerOrderInput,
    userId: string,
  ) {
    try {
      const orderItemSKUs = orderItems.map((item) => item.sku);
      const storedProductAttributes = await this.productAttributeService.find({
        where: {
          sku: In(orderItemSKUs),
        },
      });
      if (orderItemSKUs.length !== storedProductAttributes.length) {
        throw new NotFoundException('One or more products could not be found'); // TODO: should return an array of SKUs that could not be found
      }
      // check if all products are in stock compared to the requested amount in each order item
      const isAvailableInStock = this.checkStockAvailability(
        storedProductAttributes,
        orderItems,
      );
      if (!isAvailableInStock) {
        throw new BadRequestException('Not all products are in stock'); // TODO: should return an array of product SKUs that are not available
      }

      const pendingOrderStatus = await this.orderStatusRepository.findOne({
        where: { status: ORDER_STATUS.PENDING },
      });
      const customerOrder = this.customerOrderRepository.create({
        ...rest,
        userId,
        shippingCost: 5,
        orderStatus: pendingOrderStatus,
        orderItems: orderItems.map((item) => ({ ...item })),
      });
      const savedOrder = await this.customerOrderRepository.save(customerOrder);
      if (!savedOrder) {
        throw new InternalServerErrorException(
          'Something went wrong trying to save order',
        );
      }
      // update quantity of products in stock
      for (let i = 0; i < orderItems.length; i++) {
        const productAttribute = storedProductAttributes.find(
          (attr) => attr.sku === orderItems[i].sku,
        );
        await this.productAttributeService.update(
          {
            sku: orderItems[i].sku,
          },
          {
            // productAttribute will always be defined because we already checked for that earlier
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            quantity: productAttribute!.quantity - orderItems[i].quantity,
          },
        );
      }

      return savedOrder;
      // TODO: should send email to customer with id: userId
    } catch (err) {
      throw err;
    }
  }

  /**
   * Compare product quantity from Database against the requested amount in each order item
   *  */
  private checkStockAvailability(
    dbAttributes: ProductAttribute[],
    orderItems: OrderItemInput[],
  ): boolean {
    return dbAttributes.every((productAttribute) => {
      const orderItem = orderItems.find(
        (item) => item.sku === productAttribute.sku,
      );
      if (!orderItem) {
        return false;
      }
      return productAttribute.quantity - orderItem.quantity >= 0; // check if there is enough stock
    });
  }
}
