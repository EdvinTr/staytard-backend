import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductAttribute } from './product-attribute.entity';

@ObjectType()
@Entity()
export class ProductSize extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  value: string;

  @OneToMany(() => ProductAttribute, (attribute) => attribute.size)
  attributes: ProductAttribute[];
}
