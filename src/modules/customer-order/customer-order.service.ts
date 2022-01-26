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
