import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductAttribute } from './product-attribute.entity';

@ObjectType()
@Entity()
export class ProductColor extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  value: string;

  @BeforeInsert()
  private capitalize() {
    this.value =
      this.value.substring(0, 1).toUpperCase() +
      this.value.substring(1).toLowerCase();
  }

  @OneToMany(() => ProductAttribute, (attribute) => attribute.size)
  attributes: ProductAttribute[];
}
