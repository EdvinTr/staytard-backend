import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerOrderInput } from './dto/create-customer-order.input';
import { CustomerOrder } from './entities/customer-order.entity';

@Injectable()
export class CustomerOrderService {
  constructor(
    @InjectRepository(CustomerOrder)
    private readonly customerOrderRepository: Repository<CustomerOrder>,
  ) {}
  public async create(input: CreateCustomerOrderInput) {
    const customerOrder = this.customerOrderRepository.create(input);
    return this.customerOrderRepository.save(customerOrder);
  }
}
