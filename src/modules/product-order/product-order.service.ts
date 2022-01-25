import { Injectable } from '@nestjs/common';
import { CreateProductOrderInput } from './dto/create-product-order.input';

@Injectable()
export class ProductOrderService {
  create(createProductOrderInput: CreateProductOrderInput) {
    return 'This action adds a new productOrder';
  }
}
