import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

export interface ProductReviewInterface {
  id: number;
  title: string;
  content: string;
  wouldRecommend: boolean;
  rating: number;
  nickname: string;
  email: string;
  isPublished: boolean;
  productId: number;
  product: Product;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
@ObjectType()
@Entity()
export class ProductReview extends BaseEntity {
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
  nickname: string;

  @Exclude()
  @Column()
  email: string;

  @Field()
  @Column({ default: false })
  isPublished: boolean;

  @Field()
  @Column()
  productId: number;

  @ManyToOne((type) => Product, (product) => product.reviews, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ type: 'timestamp', nullable: true })
  @Field(() => Date, { nullable: true })
  publishedAt: Date | null;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
