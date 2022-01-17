import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
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
  unitPrice: number;

  @Field()
  @Column({ default: false })
  isDiscontinued: boolean;

  @Field()
  @Column()
  brandId: number;

  // TODO: should have two @Field (NOT columns) for originalPrice & currentPrice. CurrentPrice is calculated on the fly using the discount table for the product.

  @Field(() => ProductBrand)
  @ManyToOne(() => ProductBrand, (productBrand) => productBrand.products)
  brand: ProductBrand;

  @Field(() => [ProductImage], { nullable: true })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images: ProductImage[];

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

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
