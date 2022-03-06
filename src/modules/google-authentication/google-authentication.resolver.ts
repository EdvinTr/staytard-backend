import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { MyContext } from '../app/app.module';
import { UserWithTokensDto } from '../authentication/dto/user-with-tokens.dto';
import { setAuthCookies } from '../authentication/utils/auth-cookies';
import { GoogleAuthenticationService } from './google-authentication.service';

@Resolver()
export class GoogleAuthenticationResolver {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Mutation(() => UserWithTokensDto)
  async authenticateWithGoogle(
    @Args('googleAuthToken') googleAuthToken: string,
    @Context() { res }: MyContext,
  ): Promise<UserWithTokensDto | null> {
    const data = await this.googleAuthenticationService.authenticate(
      googleAuthToken,
    );
    if (!data) {
      return null;
    }
    const { accessToken, refreshToken, user } = data;
    setAuthCookies(res, accessToken, refreshToken);
    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
