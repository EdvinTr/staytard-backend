import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn()
  @Field()
  public id: number;

  @Column()
  @Field()
  public city: string;

  @Column()
  @Field()
  public street: string;

  @Column()
  @Field()
  public postalCode: string;

  @OneToOne(() => User, (user) => user.address)
  public user?: User;
}
