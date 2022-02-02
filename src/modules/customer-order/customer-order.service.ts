import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductAttributeService } from '../product/product-attribute.service';
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
      const isProductsInStock: boolean = storedProductAttributes.every(
        (productAttribute) => {
          const orderItem = orderItems.find(
            (item) => item.sku === productAttribute.sku,
          );
          if (!orderItem) {
            return false;
          }
          return productAttribute.quantity - orderItem.quantity >= 0;
        },
      );
      if (!isProductsInStock) {
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
      return this.customerOrderRepository.save(customerOrder);
    } catch (err) {
      throw err;
    }
  }

  /*   public async create(
    { orderItems, ...rest }: CreateCustomerOrderInput,
    userId: string,
  ) {
    const productSkus = orderItems.map((item) => item.sku);
    try {
      // find all the associated products
      const { items: products } = await this.productService.findBySkus({
        limit: 50,
        offset: 0,
        skus: productSkus,
      });
      if (products.length !== productSkus.length) {
        const dbProductSkus = products.map(
          (product) => product.attributes[0].sku,
        );
        const skusNotfound = productSkus.filter(
          (sku) => !dbProductSkus.includes(sku),
        );
        // send back error response with the product ids that were not found
        throw new NotFoundException(
          `SKU(s) with value(s): [${skusNotfound}] was not found`,
        );
      }
      // TODO:
      // 1. For each product sku, check the quantity in the database minus the requested amount in the order, if it is less than 0, throw an error that the product is out of stock
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
  } */
}
