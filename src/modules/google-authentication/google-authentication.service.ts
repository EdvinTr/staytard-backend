import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth, google } from 'googleapis';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class GoogleAuthenticationService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
    private readonly authenticationService: AuthenticationService,
  ) {
    const clientID = configService.get('GOOGLE_AUTH_CLIENT_ID');
    const clientSecret = configService.get('GOOGLE_AUTH_CLIENT_SECRET');
    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async authenticate(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token); // validate the google token
    const email = tokenInfo.email;
    if (!email) {
      throw new UnauthorizedException();
    }
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        return this.registerUser(token);
      }
      return this.handleRegisteredUser(user);
    } catch (error: any) {
      if (error.status !== 404) {
        throw new error();
      }
    }
  }

  async registerUser(token: string) {
    try {
      const userData = await this.getUserData(token);
      const { email, given_name, family_name } = userData;
      if (!email || !given_name || !family_name) {
        throw new Error();
      }
      const user = await this.usersService.createWithGoogle({
        firstName: given_name,
        lastName: family_name,
        email: email,
      });
      return this.handleRegisteredUser(user);
    } catch {
      return null;
    }
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token,
    });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });

    return userInfoResponse.data;
  }

  async handleRegisteredUser(user: User) {
    if (!user.isRegisteredWithGoogle) {
      user.isRegisteredWithGoogle = true;
      await this.usersService.save(user);
    }
    const accessToken = this.authenticationService.getJwtAccessToken(user.id);
    const refreshToken = this.authenticationService.getJwtRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
