import { Injectable } from '@nestjs/common';
import { CreateCustomerOrderInput } from './dto/create-customer-order.input';

@Injectable()
export class CustomerOrderService {
  create(createProductOrderInput: CreateCustomerOrderInput) {
    return 'This action adds a new productOrder';
  }
}
