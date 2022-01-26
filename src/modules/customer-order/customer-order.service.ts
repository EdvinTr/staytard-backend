import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { CreateCustomerOrderInput } from './dto/create-customer-order.input';
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
    const inputProductIds = orderItems.map((item) => item.productId);
    try {
      // find all the associated products
      const products = await this.productService.findByIds(inputProductIds);
      if (products.length !== inputProductIds.length) {
        const dbProductIds = products.map((product) => product.id);
        const idsNotFound = inputProductIds.filter(
          (productId) => !dbProductIds.includes(productId),
        );
        // send back error response with the product ids that were not found
        throw new NotFoundException(
          `Product(s) with id(s): [${idsNotFound}] was not found`,
        );
      }

      const pendingOrderStatus = await this.orderStatusRepository.findOne({
        where: { status: ORDER_STATUS.PENDING },
      });
      // TODO: fix actual shippingCost
      const customerOrder = this.customerOrderRepository.create({
        ...rest,
        userId,
        shippingCost: 5,
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
