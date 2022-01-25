import { MigrationInterface, QueryRunner } from 'typeorm';
import { CustomerOrderStatus } from '../modules/customer-order/entities/customer-order-status.entity';

export class CustomerOrderStatusSeed1643117881246
  implements MigrationInterface
{
  public async up(): Promise<void> {
    const statuses = CustomerOrderStatus.create([
      { status: 'Pending' },
      { status: 'Processing' },
      { status: 'Shipped' },
      { status: 'Completed' },
      { status: 'Cancelled' },
      { status: 'Refunded' },
      { status: 'Failed' },
      { status: 'On-Hold' },
    ]);
    await CustomerOrderStatus.save(statuses);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM customer_order_status;
    `);
  }
}
