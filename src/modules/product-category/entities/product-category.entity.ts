import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class ProductCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  public id: number;

  @Column({ unique: true })
  @Field()
  public name: string;

  @Column()
  @Field()
  public description: string;

  @Column()
  @Field()
  public path: string;

  @Column()
  @Field()
  public slug: string;

  @Field(() => ProductCategory, { nullable: true })
  @ManyToOne(() => ProductCategory, (category) => category.children)
  parent: ProductCategory;

  @Field(() => [ProductCategory], { nullable: true })
  @OneToMany(() => ProductCategory, (category) => category.parent, {
    cascade: true,
  })
  public children: ProductCategory[];

  @Field()
  @UpdateDateColumn()
  public updatedAt: Date;

  @Field()
  @CreateDateColumn()
  public createdAt: Date;
}
