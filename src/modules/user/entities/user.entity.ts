import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { capitalize } from 'lodash';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Permission from '../../../lib/permission/permission.type';
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
  address: UserAddressInterface;
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
  @Field()
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

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @Column({
    type: 'enum',
    enum: Permission,
    array: true,
    default: [],
  })
  @Field(() => [Permission])
  public permissions: Permission[];

  @Field(() => UserAddress, { nullable: true })
  @OneToOne(() => UserAddress, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  public address: UserAddress;

  // TODO: should use @BeforeUpdate as well, test that it works as well
  @BeforeInsert()
  private capitalizeBeforeInsert() {
    this.firstName = capitalize(this.firstName);
    this.lastName = capitalize(this.lastName);
  }

  @CreateDateColumn()
  @Field()
  public createdAt: Date;

  @UpdateDateColumn()
  @Field()
  public updatedAt: Date;
}
