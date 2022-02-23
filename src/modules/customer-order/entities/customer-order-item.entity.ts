import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { CustomerOrder } from './customer-order.entity';

@ObjectType()
@Entity()
@Unique(['orderId', 'productId', 'sku'])
export class CustomerOrderItem extends BaseEntity {
  @PrimaryColumn()
  @Field()
  orderId: number;

  @PrimaryColumn()
  @Field()
  productId: number;

  @PrimaryColumn()
  @Field()
  sku: string;

  @Field()
  @Column()
  quantity: number;

  @ManyToOne(() => CustomerOrder, (customerOrder) => customerOrder.orderStatus)
  order: CustomerOrder;

  @ManyToOne(() => Product, (product) => product.orderItems)
  @Field(() => Product)
  product: Product;
}
