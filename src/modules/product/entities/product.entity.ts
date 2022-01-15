import { Field, ObjectType } from '@nestjs/graphql';
import {
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
import { ProductBrand } from '../../product-brand/entities/product-brand.entity';
import { ProductCategory } from '../../product-category/entities/product-category.entity';
import { ProductImage } from './product-image.entity';
import { ProductOption } from './product-option.entity';

// TODO: add some unique constraints
@ObjectType()
@Entity()
@Unique(['name', 'brand', 'category'])
export class Product {
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
  currentPrice: number;

  @Field()
  @Column()
  originalPrice: number;

  @Field(() => ProductBrand)
  @ManyToOne(() => ProductBrand, (productBrand) => productBrand.products)
  brand: ProductBrand;

  @Field(() => [ProductImage], { nullable: true })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images: ProductImage[];

  @Field(() => ProductOption)
  @OneToMany(() => ProductOption, (productOption) => productOption.product, {
    cascade: true,
    eager: true,
  })
  options: ProductOption[];

  @ManyToOne(() => ProductCategory, (category) => category)
  @JoinColumn()
  category: ProductCategory;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
