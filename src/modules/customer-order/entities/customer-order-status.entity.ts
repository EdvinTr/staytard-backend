import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerOrder } from './customer-order.entity';

@ObjectType()
@Entity()
export class CustomerOrderStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column({ unique: true, length: 40 })
  status: string;

  @OneToMany(
    () => CustomerOrder,
    (customerOrder) => customerOrder.orderStatus,
    { onUpdate: 'CASCADE' },
  )
  orders: CustomerOrder[];
}
