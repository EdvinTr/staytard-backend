import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { validate as isValidUUID } from 'uuid';
import { EmailService } from '../email/email.service';
import { ProductAttribute } from '../product/entities/product-attribute.entity';
import { ProductAttributeService } from '../product/product-attribute.service';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import {
  CreateCustomerOrderInput,
  OrderItemInput,
} from './dto/input/create-customer-order.input';
import { FindAllCustomerOrdersInput } from './dto/input/find-all-customer-orders.input';
import { FindMyCustomerOrdersInput } from './dto/input/find-my-customer-orders.input';
import { FindOneCustomerOrderOutput } from './dto/output/find-one-customer-order.output';
import { PaginatedCustomerOrdersOutput } from './dto/output/paginated-customer-orders.output';
import { CustomerOrderStatus } from './entities/customer-order-status.entity';
import { CustomerOrder } from './entities/customer-order.entity';
import { CustomerOrderNotFoundException } from './exceptions/order-not-found.exception';
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
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  public async findOne(id: number): Promise<FindOneCustomerOrderOutput> {
    const order = await this.customerOrderRepository.findOne(id, {
      relations: [
        'orderStatus',
        'orderItems',
        'orderItems.product',
        'orderItems.product.brand',
      ],
    });
    if (!order) {
      throw new CustomerOrderNotFoundException(id);
    }
    const user = await this.userService.findById(order.userId, {
      withDeleted: true,
    });
    return {
      order,
      user,
    };
  }

  public async findAll({
    limit,
    offset,
    filters,
    q,
    sortBy,
    sortDirection,
  }: FindAllCustomerOrdersInput) {
    let query = this.customerOrderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.orderStatus', 'orderStatus')
      .innerJoinAndSelect('order.orderItems', 'orderItems');
    if (q) {
      query.where('order.orderNumber = :orderNumber', { orderNumber: q }); // search by order number
      if (isValidUUID(q)) {
        query.orWhere('order.userId = :userId', { userId: q }); // search by user ID
      } else if (!isNaN(+q)) {
        query.orWhere('order.id = :orderId', { orderId: +q }); // search by order ID
      }
    }
    if (filters) {
      if (filters.orderStatusFilter && filters.orderStatusFilter.length > 0) {
        query.andWhere(`orderStatus.status IN (:...orderStatusFilter)`, {
          orderStatusFilter: filters.orderStatusFilter, // filter on statuses of orders
        });
      }
    }
    if (sortBy && sortDirection) {
      query.orderBy(`order.${sortBy}`, sortDirection);
    }
    const [customerOrders, totalCount] = await query
      .cache(10000)
      .take(limit)
      .skip(offset)
      .getManyAndCount();
    return {
      items: customerOrders,
      totalCount,
      hasMore: totalCount - offset > limit,
    };
  }

  public async findMyCustomerOrders(
    userId: string,
    { limit, offset }: FindMyCustomerOrdersInput,
  ): Promise<PaginatedCustomerOrdersOutput> {
    const [customerOrders, totalCount] =
      await this.customerOrderRepository.findAndCount({
        where: { userId },
        take: limit,
        skip: offset,
        relations: ['orderStatus'],
      });
    return {
      items: customerOrders,
      totalCount,
      hasMore: totalCount - offset > limit,
    };
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
      const productsForEmail = await this.productService.findBySkus({
        limit: orderItemSKUs.length,
        offset: 0,
        skus: orderItemSKUs,
      });
      this.emailService.sendProductOrderConfirmationEmail(
        userId,
        customerOrder.orderItems,
        customerOrder,
        productsForEmail.items,
      ); //! No await since we don't need to wait for the email to be sent before returning from this function

      return savedOrder;
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
