import { Field, ObjectType } from '@nestjs/graphql';
import { capitalize } from 'lodash';
import {
  BeforeInsert,
  BeforeUpdate,
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
    this.city = this.city.trim();
    this.city = capitalize(this.city);
    this.street = this.street.trim();
    this.street = capitalize(this.street);
  }

  @BeforeUpdate()
  private capitalizeBeforeUpdate() {
    this.city = this.city.trim();
    this.city = capitalize(this.city);
    this.street = this.street.trim();
    this.street = capitalize(this.street);
  }

  @OneToOne(() => User, (user) => user.address)
  @JoinColumn({ referencedColumnName: 'id' })
  public user: User;
}
