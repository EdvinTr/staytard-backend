import { MigrationInterface, QueryRunner } from 'typeorm';
import { CustomerOrderStatus } from '../modules/customer-order/entities/customer-order-status.entity';
import { ORDER_STATUS } from '../modules/customer-order/typings/order-status.enum';

export class CustomerOrderStatusSeed1643117881246
  implements MigrationInterface
{
  public async up(): Promise<void> {
    const statuses = CustomerOrderStatus.create([
      ...Object.values(ORDER_STATUS).map((v) => ({ status: v })),
    ]);
    await CustomerOrderStatus.save(statuses);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM customer_order_status;
    `);
  }
}
