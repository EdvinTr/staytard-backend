import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CustomerOrderItem } from './customer-order-item.entity';
import { CustomerOrderStatus } from './customer-order-status.entity';

@ObjectType()
@Entity()
export class CustomerOrder extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  deliveryAddress: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  postalCode: string;

  @Field()
  @Column()
  totalAmount: number;

  @Field()
  @Column()
  shippingCost: number;

  @Field()
  @Column({
    generatedType: 'STORED',
    asExpression: `total_amount + shipping_cost`,
  })
  grandTotal: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => CustomerOrderStatus, (status) => status.orders)
  orderStatus: CustomerOrderStatus;

  @OneToMany(() => CustomerOrderItem, (item) => item.order, { cascade: true })
  orderItems: CustomerOrderItem[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
