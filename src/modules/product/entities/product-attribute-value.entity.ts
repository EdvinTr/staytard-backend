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
  /*   @PrimaryColumn()
  @Field()
  optionProductId: number;

  @PrimaryColumn()
  @Field()
  optionOptionId: number; */

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
