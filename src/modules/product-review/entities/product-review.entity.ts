import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

// TODO:
// 1. Should reference products, (FK should be in this ProductReview entity)
// 2. The referenced product should not have a @Field

// number / string / boolean
@ObjectType()
@Entity()
export class ProductReview {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  wouldRecommend: boolean;

  @Field()
  @Column()
  rating: number;

  @Field()
  @Column()
  submittedByAlias: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  isPublished: boolean;

  @Field()
  @Column()
  productId: number;

  @ManyToOne((type) => Product, (product) => product.reviews)
  product: Product;

  @Column('timestamp', { nullable: true })
  published: Date;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
