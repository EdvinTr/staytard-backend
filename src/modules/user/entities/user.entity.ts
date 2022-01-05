import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
