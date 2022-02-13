import { Field, ObjectType } from '@nestjs/graphql';
import * as _ from 'lodash';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerOrderItem } from '../../customer-order/entities/customer-order-item.entity';
import { ProductBrand } from '../../product-brand/entities/product-brand.entity';
import { ProductCategory } from '../../product-category/entities/product-category.entity';
import { ProductReview } from '../../product-review/entities/product-review.entity';
import { ProductAttribute } from './product-attribute.entity';
import { ProductImage } from './product-image.entity';

@ObjectType()
@Entity()
@Unique(['name', 'brand', 'category']) //? redundant?
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  originalPrice: number;

  @Field()
  @Column()
  currentPrice: number;

  @Field()
  @Column({ default: false })
  isDiscontinued: boolean;

  @Field()
  @Column()
  brandId: number;

  @BeforeInsert()
  private capitalizeName() {
    this.name = this.name
      .split(' ')
      .map((w) => _.capitalize(w))
      .join(' ');
  }

  @Field(() => ProductBrand)
  @ManyToOne(() => ProductBrand, (productBrand) => productBrand.products)
  brand: ProductBrand;

  @Field(() => [ProductImage])
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images: ProductImage[];

  @OneToMany(() => ProductReview, (reviews) => reviews.product, {
    cascade: true,
  })
  reviews: ProductReview[];

  @Field(() => [ProductAttribute])
  @OneToMany(() => ProductAttribute, (attributes) => attributes.product, {
    cascade: true,
    eager: true,
  })
  attributes: ProductAttribute[];

  @Field()
  @Column()
  categoryId: number;

  @ManyToOne(() => ProductCategory, (category) => category)
  @JoinColumn()
  category: ProductCategory;

  @OneToMany(() => CustomerOrderItem, (orderItem) => orderItem.product)
  orderItems: CustomerOrderItem[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
