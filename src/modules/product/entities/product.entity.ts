import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductBrand } from '../../product-brand/entities/product-brand.entity';

@ObjectType()
@Entity()
export class Product {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  color: string;

  @Field()
  @Column()
  currentPrice: number;

  @Field()
  @Column()
  originalPrice: number;

  @Field(() => ProductBrand)
  @ManyToOne(() => ProductBrand, (productBrand) => productBrand.products)
  brand: ProductBrand;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
