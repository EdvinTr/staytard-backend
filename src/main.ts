import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app/app.module';
import { isProduction } from './utils/is-production.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    helmet({
      contentSecurityPolicy: isProduction() ? undefined : false,
    }),
  );
  app.enableCors({
    credentials: true,
    origin: [configService.get('FRONTEND_URL') || ''],
  });
  await app.listen(configService.get('SERVER_PORT') || 4000);
}
bootstrap();
