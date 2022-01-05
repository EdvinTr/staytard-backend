import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import {
  DeleteResult,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { RegisterUserDto } from '../authentication/dto/register-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(
    id: string,
    options?: FindOneOptions<User>,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne(id, { ...options });
  }

  async create(createUserData: RegisterUserDto): Promise<User> {
    const { city, postalCode, street, ...rest } = createUserData;
    const user = this.userRepository.create({
      ...rest,
      address: {
        city,
        postalCode,
        street,
      },
    });
    return await this.userRepository.save(user);
  }

  async deleteById(userId: string): Promise<DeleteResult> {
    return await this.userRepository.delete(userId);
  }
  async findAll(relations?: string[]): Promise<User[]> {
    return await this.userRepository.find({ relations: relations || [] });
  }

  async createWithGoogle(registerUserDto: RegisterUserDto): Promise<User> {
    const { firstName, lastName, email, mobilePhoneNumber } = registerUserDto;
    const newUser = this.userRepository.create({
      firstName,
      lastName,
      email,
      isRegisteredWithGoogle: true,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }
  async setCurrentRefreshToken(
    refreshToken: string,
    userId: string,
  ): Promise<void> {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }
  async removeRefreshToken(userId: string): Promise<UpdateResult> {
    return this.userRepository.update(userId, {
      currentHashedRefreshToken: undefined,
    });
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: string,
  ): Promise<User | undefined> {
    const user = await this.findById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user?.currentHashedRefreshToken || '',
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
}
