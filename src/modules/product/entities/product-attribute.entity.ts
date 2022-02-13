import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { ProductColor } from './product-color.entity';
import { ProductSize } from './product-size.entity';
import { Product } from './product.entity';

@ObjectType()
@Entity()
@Unique(['sku', 'size', 'color'])
export class ProductAttribute {
  @Field()
  @Column({ unique: true })
  sku: string;

  @Field()
  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.attributes, {
    primary: true,
    onDelete: 'CASCADE',
  })
  product: Product;

  @Field(() => ProductSize)
  @ManyToOne((type) => ProductSize, (size) => size.attributes, {
    primary: true,
    eager: true,
    cascade: true,
  })
  size: ProductSize;

  @Field(() => ProductColor)
  @ManyToOne((type) => ProductColor, (color) => color.attributes, {
    primary: true,
    eager: true,
    cascade: true,
  })
  color: ProductColor;
}
