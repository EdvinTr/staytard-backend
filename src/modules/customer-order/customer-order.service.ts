import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, In, Repository } from 'typeorm';
import { validate as isValidUUID } from 'uuid';
import { CUSTOMER_ORDER_SORT_BY } from '../../lib/gql-enums';
import { EmailService } from '../email/email.service';
import { ProductAttributeService } from '../product/product-attribute.service';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import {
  CreateCustomerOrderInput,
  OrderItemInput,
} from './dto/input/create-customer-order.input';
import { FindAllCustomerOrdersInput } from './dto/input/find-all-customer-orders.input';
import { FindMyCustomerOrdersInput } from './dto/input/find-my-customer-orders.input';
import { UpdateCustomerOrderInput } from './dto/input/update-customer-order.input';
import { FindOneCustomerOrderOutput } from './dto/output/find-one-customer-order.output';
import { PaginatedCustomerOrdersOutput } from './dto/output/paginated-customer-orders.output';
import { CustomerOrderStatus } from './entities/customer-order-status.entity';
import { CustomerOrder } from './entities/customer-order.entity';
import { CustomerOrderNotFoundException } from './exceptions/order-not-found.exception';
import { ORDER_STATUS } from './typings/order-status.enum';

const unUpdatableOrderStatuses = [
  ORDER_STATUS.CANCELLED,
  ORDER_STATUS.COMPLETED,
  ORDER_STATUS.REFUNDED,
];
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

  public async update({
    orderId,
    orderStatus,
    city,
    postalCode,
    deliveryAddress,
  }: UpdateCustomerOrderInput): Promise<boolean> {
    const order = await this.customerOrderRepository.findOne(orderId, {
      relations: ['orderStatus'],
    });
    if (!order) {
      throw new CustomerOrderNotFoundException(orderId);
    }
    if (
      unUpdatableOrderStatuses.includes(
        order.orderStatus.status as ORDER_STATUS,
      )
    ) {
      throw new BadRequestException(
        `Cannot update an order which currently has status ${order.orderStatus.status}`,
      );
    }

    const foundOrderStatus = await this.orderStatusRepository.findOne({
      status: orderStatus,
    });
    if (!foundOrderStatus) {
      throw new NotFoundException(`Could not find order status ${orderStatus}`);
    }
    const updateResult = await this.customerOrderRepository.update(orderId, {
      city,
      deliveryAddress,
      postalCode,
      orderStatus: foundOrderStatus,
    });
    if (updateResult.affected === 0) {
      throw new InternalServerErrorException('Could not update the order');
    }
    return true;
  }

  public async findOneWithArgs(options: FindOneOptions<CustomerOrder>) {
    return this.customerOrderRepository.findOne(options);
  }

  public async findOne(
    id: number,
    options?: FindOneOptions<CustomerOrder>,
  ): Promise<FindOneCustomerOrderOutput> {
    const order = await this.customerOrderRepository.findOne(id, {
      relations: [
        'orderItems',
        'orderItems.product',
        'orderItems.product.brand',
        'user',
      ],
      ...options,
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
      isEditable: !unUpdatableOrderStatuses.includes(
        order.orderStatus.status as ORDER_STATUS,
      ),
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
      query.orWhere('order.stripeSessionId = :stripeSessionId', {
        stripeSessionId: q,
      }); // search by stripe session id
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
    { limit, offset, sortBy, sortDirection }: FindMyCustomerOrdersInput,
  ): Promise<PaginatedCustomerOrdersOutput> {
    const query = this.customerOrderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.orderStatus', 'orderStatus')
      .where('order.userId = :userId', { userId })
      .take(limit)
      .skip(offset);

    if (sortBy && sortDirection) {
      if (sortBy === CUSTOMER_ORDER_SORT_BY.STATUS) {
        query.orderBy(`orderStatus.status`, sortDirection);
      } else {
        query.orderBy(`order.${sortBy}`, sortDirection);
      }
    }
    const [customerOrders, totalCount] = await query.getManyAndCount();
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
    // check if all products are in stock compared to the requested amount in each order item
    const isAvailableInStock = await this.checkStockAvailability(orderItems);
    if (!isAvailableInStock) {
      throw new BadRequestException('Not all products are in stock'); // TODO: should return an array of product SKUs that are not available
    }
    const pendingOrderStatus = await this.orderStatusRepository.findOne({
      where: { status: ORDER_STATUS.PENDING },
    });
    const orderItemSKUs = orderItems.map((item) => item.sku);
    const storedProductAttributes = await this.productAttributeService.find({
      where: {
        sku: In(orderItemSKUs),
      },
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
  }

  /**
   * Compare product quantity from Database against the requested amount in each order item
   *  */
  async checkStockAvailability(orderItems: OrderItemInput[]): Promise<boolean> {
    const orderItemSKUs = orderItems.map((item) => item.sku);
    const attributes = await this.productAttributeService.find({
      where: {
        sku: In(orderItemSKUs), // fetch attributes for each SKU
      },
    });
    if (orderItemSKUs.length !== attributes.length) {
      return false; // TODO: should return an array of SKUs that could not be found
    }
    return attributes.every((productAttribute) => {
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
