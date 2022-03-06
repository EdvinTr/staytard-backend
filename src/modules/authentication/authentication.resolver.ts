import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { MyContext } from '../app/app.module';
import { UserService } from '../user/user.service';
import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserWithTokensDto } from './dto/user-with-tokens.dto';
import { GraphqlJwtAuthGuard } from './guards/graphql-jwt-auth.guard';
import RequestWithUser from './interfaces/request-with-user.interface';
import { removeAuthCookies, setAuthCookies } from './utils/auth-cookies';

@Resolver()
export class AuthenticationResolver {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => UserWithTokensDto)
  async registerUser(
    @Args('input') input: RegisterUserDto,
    @Context() { res }: MyContext,
  ): Promise<UserWithTokensDto | null> {
    const user = await this.authenticationService.register(input);
    if (!user) {
      return null;
    }
    const accessToken = this.authenticationService.getJwtAccessToken(user.id);
    const refreshToken = this.authenticationService.getJwtRefreshToken(user.id);
    setAuthCookies(res, accessToken, refreshToken);
    return {
      user,
      accessToken,
      refreshToken,
    };
  }
  @Mutation(() => UserWithTokensDto)
  async login(
    @Args('input') { email, password }: LoginUserDto,
    @Context() { res }: MyContext,
  ): Promise<UserWithTokensDto> {
    const user = await this.authenticationService.getAuthenticatedUser(
      email,
      password,
    );
    const accessToken = this.authenticationService.getJwtAccessToken(user.id);
    const refreshToken = this.authenticationService.getJwtRefreshToken(user.id);
    setAuthCookies(res, accessToken, refreshToken);
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => Boolean)
  async logout(
    @Context() { req, res }: { req: RequestWithUser; res: Response },
  ): Promise<boolean> {
    await this.userService.removeRefreshToken(req.user.id);
    removeAuthCookies(res);
    return true;
  }
}
