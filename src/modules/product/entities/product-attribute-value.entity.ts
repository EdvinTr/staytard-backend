import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ProductAttribute } from './product-attribute.entity';

@ObjectType()
@Entity()
@Unique(['id', 'attribute'])
export class ProductAttributeValue {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  name: string;

  @ManyToOne(() => ProductAttribute, (attribute) => attribute.values, {
    primary: true,
  })
  attribute: ProductAttribute;
}
