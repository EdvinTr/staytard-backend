import { NotFoundException } from '@nestjs/common';

export class CustomerOrderNotFoundException extends NotFoundException {
  constructor(customerOrderId: number) {
    super(`Customer order with id ${customerOrderId} was not found`);
  }
}
