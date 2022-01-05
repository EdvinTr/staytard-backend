import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidLoginException extends HttpException {
  constructor() {
    super(`Invalid Credentials`, HttpStatus.BAD_REQUEST);
  }
}
