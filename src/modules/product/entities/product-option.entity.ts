import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ProductOptionValue } from './product-option-value.entity';
import { Product } from './product.entity';

@ObjectType()
@Entity()
@Unique(['productId', 'name'])
export class ProductOption {
  @PrimaryColumn()
  @Field()
  productId: number;

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  name: string;

  @ManyToOne(() => Product, (product) => product.options)
  product: Product;

  @Field(() => [ProductOptionValue])
  @OneToMany(() => ProductOptionValue, (optionValue) => optionValue.option, {
    cascade: true,
    eager: true,
  })
  values: ProductOptionValue[];
}
