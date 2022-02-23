import * as casual from 'casual';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { v4 } from 'uuid';
import { CustomerOrderItem } from '../modules/customer-order/entities/customer-order-item.entity';
import { CustomerOrderStatus } from '../modules/customer-order/entities/customer-order-status.entity';
import { CustomerOrder } from '../modules/customer-order/entities/customer-order.entity';
import { Product } from '../modules/product/entities/product.entity';
import { User } from '../modules/user/entities/user.entity';
export class SeedCustomerOrders1645528563159 implements MigrationInterface {
  public async up(): Promise<void> {
    const users = await getRepository(User).find();
    const products = await getRepository(Product).find({
      relations: ['attributes'],
    });
    const orderStatuses = await getRepository(CustomerOrderStatus).find();
    const customerOrderRepo = getRepository(CustomerOrder);
    const orderItemRepo = getRepository(CustomerOrderItem);

    const slicedUsers = users.slice(0, Math.floor(users.length / 6));
    const slicedProducts = products.slice(0, Math.floor(products.length / 6));

    for (let i = 0; i < 5000; i++) {
      const orderItems: CustomerOrderItem[] = [];
      // create order items
      for (let j = 0; j < casual.integer(1, 5); j++) {
        const product =
          slicedProducts[casual.integer(0, slicedProducts.length - 1)];

        const sku = product.attributes[0].sku; // get first variant of the product
        if (orderItems.find((o) => o.sku === sku)) {
          // if item has already been added, skip iteration
          continue;
        }
        orderItems.push(
          orderItemRepo.create({
            sku,
            product: product,
            quantity: casual.integer(1, 5),
          }),
        );
      }
      // calculate total price of order items
      const totalPrice = orderItems.reduce(
        (acc, curr) => acc + curr.product.currentPrice * curr.quantity,
        0,
      );
      const user = slicedUsers[casual.integer(0, slicedUsers.length - 1)];
      // create order
      const customerOrder = customerOrderRepo.create({
        city: user.address?.city || casual.city,
        deliveryAddress: user.address?.street || casual.address,
        postalCode: user.address?.postalCode || casual.zip(5),
        orderNumber: v4(),
        purchaseCurrency: 'EUR',
        paymentType: 'card',
        shippingCost: 5,
        orderStatus: orderStatuses[casual.integer(0, orderStatuses.length - 1)],
        user,
        orderItems: [...orderItems],
        totalAmount: totalPrice,
      });
      // save order
      await customerOrderRepo.save(customerOrder);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE customer_order CASCADE;`); // deletes from order_item table as well
  }
}
