import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

// TODO:
// 1. Should reference products, (FK should be in this ProductReview entity)
// 2. The referenced product should not have a @Field
@ObjectType()
@Entity()
export class ProductReview {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
}
