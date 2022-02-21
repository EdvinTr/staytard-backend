import { Field, ObjectType } from '@nestjs/graphql';
import { capitalize } from 'lodash';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

export interface UserAddressInterface {
  id: number;
  street: string;
  city: string;
  postalCode: string;
}

@ObjectType()
@Entity()
export class UserAddress implements UserAddressInterface {
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

  @BeforeInsert()
  private capitalizeBeforeInsert() {
    this.city = capitalize(this.city.trim());
    this.street = capitalize(this.street.trim());
  }

  @OneToOne(() => User, (user) => user.address)
  @JoinColumn({ referencedColumnName: 'id' })
  public user: User;
}
