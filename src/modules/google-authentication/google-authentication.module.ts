import { Module } from '@nestjs/common';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UserModule } from '../user/user.module';
import { GoogleAuthenticationResolver } from './google-authentication.resolver';
import { GoogleAuthenticationService } from './google-authentication.service';

@Module({
  imports: [UserModule, AuthenticationModule],
  providers: [GoogleAuthenticationService, GoogleAuthenticationResolver],
})
export class GoogleAuthenticationModule {}
