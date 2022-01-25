import { Injectable } from '@nestjs/common';
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
  public async create(input: CreateCustomerOrderInput, userId: string) {
    // find all the associated products

    // calculate the total amount
    // should also calculate the discount
    const customerOrder = this.customerOrderRepository.create({
      ...input,
      userId,
      shippingCost: 5,
      totalAmount: 8, // total amount based on the products
    });
    return this.customerOrderRepository.save(customerOrder);
  }
}
