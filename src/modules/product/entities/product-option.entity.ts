import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';

@ObjectType()
@Entity()
export class ProductOption {
  @PrimaryColumn()
  @Field()
  productId: number;

  @PrimaryColumn()
  @Field()
  optionId: number;

  @Field()
  @Column()
  optionName: string;

  @ManyToOne(() => Product, (product) => product.options)
  product: Product;
}
