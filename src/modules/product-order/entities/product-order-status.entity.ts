import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductOrder } from './product-order.entity';

@ObjectType()
@Entity()
export class ProductOrderStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column({ unique: true, length: 40 })
  status: string;

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.orderStatus)
  orders: ProductOrder[];
}
