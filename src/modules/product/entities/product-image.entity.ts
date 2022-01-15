import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@ObjectType()
@Entity()
export class ProductImage {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  imageUrl: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
