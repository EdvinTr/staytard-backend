import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ProductOption } from './product-option.entity';

@ObjectType()
@Entity()
@Unique(['id', 'option'])
export class ProductOptionValue {
  /*   @PrimaryColumn()
  @Field()
  optionProductId: number;

  @PrimaryColumn()
  @Field()
  optionOptionId: number; */

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  name: string;

  @ManyToOne(() => ProductOption, (option) => option.values, {
    primary: true,
  })
  option: ProductOption;
}
