import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app/app.module';
import { __isProduction__ } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    helmet({
      contentSecurityPolicy: __isProduction__ ? undefined : false,
    }),
  );
  app.enableCors({
    credentials: true,
    origin: [configService.get('FRONTEND_URL') || ''],
  });
  await app.listen(configService.get('SERVER_PORT') || 4000);
}
bootstrap();
