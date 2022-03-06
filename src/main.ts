import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { __isProduction__ } from './constants';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(
    helmet({
      contentSecurityPolicy: __isProduction__ ? undefined : false,
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: [configService.get('FRONTEND_URL') || ''],
  });
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
