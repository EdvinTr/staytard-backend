import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ProductOrderStatus } from './product-order-status.entity';

@ObjectType()
@Entity()
export class ProductOrder extends BaseEntity {
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

  @ManyToOne(() => ProductOrderStatus, (status) => status.orders)
  orderStatus: ProductOrderStatus;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
