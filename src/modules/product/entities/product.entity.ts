import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
