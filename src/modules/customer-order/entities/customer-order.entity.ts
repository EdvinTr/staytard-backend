import { Field, ObjectType } from '@nestjs/graphql';
import { capitalize } from 'lodash';
import {
  BaseEntity,
  BeforeInsert,
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
  @Column({ unique: true })
  orderNumber: string;

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

  @BeforeInsert()
  private capitalizeCurrency() {
    this.purchaseCurrency = capitalize(this.purchaseCurrency);
  }

  @Field()
  @Column({ length: 20 })
  purchaseCurrency: string;

  @Field()
  @Column()
  paymentType: string;

  @Field()
  @Column({ nullable: false })
  userId: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null, unique: true })
  stripeSessionId?: string;

  @Field()
  @Column({ nullable: false })
  orderStatusId: number;

  @ManyToOne(() => CustomerOrderStatus, (status) => status.orders, {
    onUpdate: 'CASCADE',
    eager: true,
  })
  @Field(() => CustomerOrderStatus)
  orderStatus: CustomerOrderStatus;

  @OneToMany(() => CustomerOrderItem, (item) => item.order, { cascade: true })
  @Field(() => [CustomerOrderItem])
  orderItems: CustomerOrderItem[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
