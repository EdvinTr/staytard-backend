import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { capitalize } from 'lodash';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Permission from '../../../lib/permission/permission.type';
import { CustomerOrder } from '../../customer-order/entities/customer-order.entity';
import { UserAddress, UserAddressInterface } from './user-address.entity';

export interface UserInterface {
  id: string;
  email: string;
  isRegisteredWithGoogle: boolean;
  firstName: string;
  lastName: string;
  mobilePhoneNumber?: string;
  isEmailConfirmed: boolean;
  permissions: Permission[];
  address?: UserAddressInterface;
  currentHashedRefreshToken?: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
@ObjectType()
@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  public id: string;

  @Column()
  @Field()
  public firstName: string;

  @Column()
  @Field()
  public lastName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public mobilePhoneNumber?: string;

  @Column({ nullable: true })
  @Exclude()
  public password?: string;

  @Column({ unique: true })
  @Field()
  public email: string;

  @Column({ default: false })
  @Field()
  public isEmailConfirmed: boolean;

  @Column({ default: false })
  @Field()
  public isRegisteredWithGoogle: boolean;

  @Column({ default: false })
  @Field()
  isAdmin: boolean;

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @OneToMany(() => CustomerOrder, (orders) => orders.user)
  orders: CustomerOrder[];

  @Column({
    type: 'enum',
    enum: Permission,
    array: true,
    default: [],
  })
  @Field(() => [Permission])
  public permissions: Permission[];

  @Field(() => UserAddress, { nullable: true })
  @OneToOne(() => UserAddress, (address) => address.user, {
    cascade: true,
    eager: true,
  })
  public address?: UserAddress;

  @BeforeInsert()
  private capitalizeBeforeInsert() {
    this.firstName = capitalize(this.firstName.trim());
    this.lastName = capitalize(this.lastName.trim());
    this.mobilePhoneNumber = this.mobilePhoneNumber?.trim();
    this.email = this.email.trim();
  }

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  public deletedAt: Date;

  @CreateDateColumn()
  @Field()
  public createdAt: Date;

  @UpdateDateColumn()
  @Field()
  public updatedAt: Date;
}
