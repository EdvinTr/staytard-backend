import { Field, ObjectType } from '@nestjs/graphql';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {time, timezone, unix_time} from "casual";

// TODO:
// 1. Should reference products, (FK should be in this ProductReview entity)
// 2. The referenced product should not have a @Field
@ObjectType()
@Entity()
export class ProductReview {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  title:Text;

  @Field()
  content:Text;

  @Field()
  would_recommend:boolean;

  @Field()
  rating:number;

  @Field()
  submitted_by_alias:Text;

  @Field()
  email:Text;

  @Field()
  is_published:boolean;


  @Column("timestamp")
  published:Text;


  @Column("timestamp")
  created_at:Text;


  @Column("timestamp")
  update_at:Text;
  
}
