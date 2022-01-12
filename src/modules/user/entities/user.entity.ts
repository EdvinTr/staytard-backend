import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAddress } from './user-address.entity';

@ObjectType()
@Entity()
export class User {
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

  @Column({ default: false })
  @Field()
  public isAdmin: boolean;

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @Field(() => UserAddress, { nullable: true })
  @OneToOne(() => UserAddress, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  public address: UserAddress;

  @CreateDateColumn()
  @Field()
  public createdAt: Date;

  @UpdateDateColumn()
  @Field()
  public updatedAt: Date;
}
