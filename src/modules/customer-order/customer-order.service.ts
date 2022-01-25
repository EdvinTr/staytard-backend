import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { CreateCustomerOrderInput } from './dto/create-customer-order.input';
import { CustomerOrder } from './entities/customer-order.entity';

@Injectable()
export class CustomerOrderService {
  constructor(
    @InjectRepository(CustomerOrder)
    private readonly customerOrderRepository: Repository<CustomerOrder>,
    private readonly productService: ProductService,
  ) {}
  public async create(
    { orderItems, ...rest }: CreateCustomerOrderInput,
    userId: string,
  ) {
    const productIds = [...new Set(orderItems.map((item) => item.productId))];
    try {
      // find all the associated products
      const products = await this.productService.findByIds(productIds);
      if (products.length !== productIds.length) {
        const idsNotFound = productIds.filter(
          (id) => !products.map((p) => p.id).includes(id),
        );
        throw new NotFoundException(
          `Product(s) with id(s): [${idsNotFound}] was not found`,
        );
      }
      // calculate the total amount based upon products and their quantity
      // TODO: should also calculate the discount
      const customerOrder = this.customerOrderRepository.create({
        ...rest,
        userId,
        shippingCost: 5,
        totalAmount: 8, // total amount based on the products
      });
      return this.customerOrderRepository.save(customerOrder);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
