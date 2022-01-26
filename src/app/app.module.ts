import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { join } from 'path';
import { AuthenticationModule } from '../modules/authentication/authentication.module';
import { CustomerOrderModule } from '../modules/customer-order/customer-order.module';
import { DatabaseModule } from '../modules/database/database.module';
import { GoogleAuthenticationModule } from '../modules/google-authentication/google-authentication.module';
import { KlarnaPaymentModule } from '../modules/klarna-payment/klarna-payment.module';
import { ProductBrandModule } from '../modules/product-brand/product-brand.module';
import { ProductCategoryModule } from '../modules/product-category/product-category.module';
import { ProductReviewModule } from '../modules/product-review/product-review.module';
import { ProductModule } from '../modules/product/product.module';
import { UserModule } from '../modules/user/user.module';

export type JwtPayload = {
  sub: string;
};

export type MyContext = {
  req: Request;
  res: Response;
};
@Module({
  imports: [
    UserModule,
    DatabaseModule,
    ProductCategoryModule,
    ProductModule,
    CustomerOrderModule,
    ProductBrandModule,
    ProductReviewModule,
    KlarnaPaymentModule,
    AuthenticationModule,
    GoogleAuthenticationModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().required(),
        JWT_ACCESS_TOKEN_COOKIE_NAME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().required(),
        JWT_REFRESH_TOKEN_COOKIE_NAME: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
        FRONTEND_URL: Joi.string().required(),
        GRAPHQL_PLAYGROUND: Joi.boolean().required(),
      }),
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        playground: Boolean(configService.get('GRAPHQL_PLAYGROUND')),
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        cors: {
          credentials: true,
          origin: true,
        },
        context: ({ req, res }): MyContext => ({
          req,
          res,
        }),
      }),
    }),
    /*     ThrottlerModule.forRoot({
      ttl: 60, // 60 seconds
      limit: 300, // 300 requests
    }), */
  ],
  /* providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ], */
})
export class AppModule {}
