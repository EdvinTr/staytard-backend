import { NotFoundException } from '@nestjs/common';

class UserNotFoundException extends NotFoundException {
  constructor(userId: string) {
    super(`User with id ${userId} not found`);
  }
}

export default UserNotFoundException;
