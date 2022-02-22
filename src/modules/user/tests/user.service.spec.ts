import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserAddress } from '../entities/user-address.entity';
import { User } from '../entities/user.entity';
import UserNotFoundException from '../exceptions/user-not-found.exception';
import { UserService } from '../user.service';
const mockUserWithoutAddress = {
  id: 'uuid2bsajhsdasdk',
};
const mockUserWithAddress = {
  id: 'uuid2bsajhsdasdk',
  address: {
    id: 1,
    city: 'New York',
    street: 'CoolStreet 25',
    postalCode: '87423',
  },
};
describe('UserService', () => {
  let bcryptHash: jest.Mock;
  let bcryptCompare: jest.Mock;
  let userService: UserService;
  let mockUserRepository = {
    save: jest.fn().mockResolvedValue(mockUserWithAddress),
    findOne: jest.fn().mockResolvedValue(mockUserWithAddress),
    update: jest.fn(),
    findAndCount: jest.fn(),
  };
  let mockAddressRepository = {
    update: jest.fn(),
  };
  beforeEach(async () => {
    mockUserRepository = {
      save: jest.fn().mockResolvedValue(mockUserWithAddress),
      findOne: jest.fn().mockResolvedValue(mockUserWithAddress),
      update: jest.fn(),
      findAndCount: jest.fn().mockResolvedValue([[mockUserWithAddress], 1]),
    };
    mockAddressRepository = {
      update: jest.fn(),
    };
    bcryptHash = jest.fn().mockReturnValue((value: string) => value);
    (bcrypt.hash as jest.Mock) = bcryptHash;

    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(UserAddress),
          useValue: mockAddressRepository,
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
  });

  describe('when updating password', () => {
    beforeEach(() => {
      mockUserRepository.findOne.mockResolvedValue({
        id: 'someUuid',
        password: '123',
      });
    });
    describe('and old password is invalid', () => {
      beforeEach(() => {
        bcryptCompare.mockReturnValue(false);
      });
      it('should throw an error', async () => {
        await expect(
          userService.updatePassword('uuid', {
            oldPassword: 'wrongPassword',
            newPassword: 'newPassword',
          }),
        ).rejects.toThrow();
      });
    });
    describe('and old password is valid', () => {
      beforeEach(() => {
        bcryptCompare.mockReturnValue(true);
      });
      it('should update the users password', async () => {
        await expect(
          userService.updatePassword('uuid', {
            oldPassword: 'oldPassword',
            newPassword: 'newPassword',
          }),
        ).resolves.toBe(true);
      });
    });
    describe('and the users password is null in database', () => {
      beforeEach(() => {
        mockUserRepository.findOne.mockResolvedValue({
          id: 'someUuid',
        });
      });
      it('should save the new password', async () => {
        await expect(
          userService.updatePassword('uuid', {
            newPassword: 'newPassword',
          }),
        ).resolves.toBe(true);
      });
    });
  });

  describe('when fetching all users', () => {
    it('should return all users', async () => {
      const data = await userService.findAll({ limit: 10, offset: 0 });
      expect(data).toMatchObject({
        items: [mockUserWithAddress],
      });
    });
  });

  describe('when updating a users address', () => {
    describe('and the user wants to update an existing address record', () => {
      it('should update the record and return the user with the updated address', async () => {
        const user = await userService.updateAddress('someUUID', {
          ...mockUserWithAddress.address,
        });
        expect(mockUserRepository.save).not.toHaveBeenCalled(); // save should not be called when updating
        expect(mockAddressRepository.update).toHaveBeenCalledTimes(1);
        expect(user).toMatchObject(mockUserWithAddress);
      });
    });
    describe('and the user does not have an address', () => {
      beforeEach(() => {
        mockUserRepository.findOne = jest
          .fn()
          .mockResolvedValue(mockUserWithoutAddress);
      });
      it('should create a new address record and return the user with the address', async () => {
        const user = await userService.updateAddress(mockUserWithAddress.id, {
          ...mockUserWithAddress.address,
        });
        expect(mockAddressRepository.update).not.toHaveBeenCalled(); // should not call update when user doesn't have an already existing address
        expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
        expect(user).toMatchObject(mockUserWithAddress);
      });
    });
    describe('and the user cannot be found in database', () => {
      beforeEach(() => {
        mockUserRepository.findOne = jest.fn().mockResolvedValue(null);
      });
      it('should throw an error', async () => {
        await expect(
          userService.updateAddress('someUUID', {
            ...mockUserWithAddress.address,
          }),
        ).rejects.toThrowError(new UserNotFoundException('someUUID'));
      });
    });
  });
});
