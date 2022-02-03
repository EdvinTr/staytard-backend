import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import {
  DeleteResult,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { RegisterUserDto } from '../authentication/dto/register-user.dto';
import { RegisterWithGoogleDto } from '../google-authentication/dto/register-with-google-dto';
import { UpdateUserAddressInput } from './dto/update-user-address.input';
import { UpdateUserPasswordInput } from './dto/update-user-password.input';
import { UserAddress } from './entities/user-address.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserAddress)
    private readonly addressRepository: Repository<UserAddress>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }
  async save(user: User) {
    return await this.userRepository.save(user);
  }

  async findById(
    id: string,
    options?: FindOneOptions<User>,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne(id, { ...options, cache: 10000 });
  }

  async updateAddress(
    userId: string,
    address: UpdateUserAddressInput,
  ): Promise<User> {
    try {
      const user = await this.userRepository.findOne(userId, {
        relations: ['address'],
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (user.address) {
        await this.addressRepository.update(
          {
            id: user.address.id, // update where id is equal to user.address.id
          },
          {
            ...address,
          },
        );
        const savedUser = await this.userRepository.findOne(user.id);
        if (!savedUser) {
          throw new NotFoundException(); // Add this because of TS
        }
        return savedUser;
      } else {
        // user doesn't have an address so we create and save a new one
        const userWithAddress = {
          ...user,
          address: {
            ...address,
          },
        };
        return await this.userRepository.save(userWithAddress);
      }
    } catch (error) {
      throw error;
    }
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

  async updatePassword(
    userId: string,
    { oldPassword, newPassword }: UpdateUserPasswordInput,
  ) {
    try {
      const user = await this.userRepository.findOne(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!user.password || !oldPassword) {
        // set a new password since user must have signed up through OAuth provider and doesn't yet have a password in database
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userRepository.update(userId, {
          password: hashedPassword,
        });
        return true;
      }
      // compare old password provided against the one stored in database
      const isPasswordMatching = await bcrypt.compare(
        oldPassword,
        user.password,
      );
      if (!isPasswordMatching) {
        throw new BadRequestException('Invalid old password');
      }
      // hash new password and update password column
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userRepository.update(userId, {
        password: hashedPassword,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(userId: string): Promise<DeleteResult> {
    return await this.userRepository.delete(userId);
  }
  async findAll(relations?: string[]): Promise<User[]> {
    return await this.userRepository.find({ relations: relations || [] });
  }

  async createWithGoogle(
    registerWithGoogleDto: RegisterWithGoogleDto,
  ): Promise<User> {
    const { email, firstName, lastName } = registerWithGoogleDto;
    const newUser = this.userRepository.create({
      firstName,
      lastName,
      email,
      isEmailConfirmed: true,
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
