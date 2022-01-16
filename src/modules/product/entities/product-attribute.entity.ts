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
import { ProductAttributeValue } from './product-attribute-value.entity';
import { Product } from './product.entity';

@ObjectType()
@Entity()
@Unique(['productId', 'name'])
export class ProductAttribute {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @PrimaryColumn()
  @Field()
  productId: number;

  @Field()
  @Column()
  name: string;

  @ManyToOne(() => Product, (product) => product.attributes)
  product: Product;

  @Field(() => [ProductAttributeValue])
  @OneToMany(() => ProductAttributeValue, (values) => values.attribute, {
    cascade: true,
    eager: true,
  })
  values: ProductAttributeValue[];
}
