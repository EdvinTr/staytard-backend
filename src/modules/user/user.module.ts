import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from './entities/user-address.entity';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserResolver],
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserAddress]),
  ],
  exports: [UserService],
})
export class UserModule {}
