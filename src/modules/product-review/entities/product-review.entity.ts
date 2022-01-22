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
  @Column({ default: false })
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
