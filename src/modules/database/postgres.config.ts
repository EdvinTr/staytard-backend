/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { __isProduction__ } from '../../constants';
dotenv.config();

const { DATABASE_LOGGING } = process.env;

// have to use exclamation mark because TS goes ballista if you try to use typeorm migration:revert command
const postgresConfig: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  /*   host: POSTGRES_HOST!,
  port: +POSTGRES_PORT!,
  username: POSTGRES_USER!,
  password: POSTGRES_PASSWORD!,
  database: POSTGRES_DB!, */
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [
    __isProduction__
      ? __dirname + '/../../../dist/prod-migrations/**/*{.ts,.js}'
      : __dirname + '/../../../dist/migrations/**/*{.ts,.js}',
  ],
  ssl: {
    rejectUnauthorized: true,
  },
  migrationsRun: true,
  synchronize: true,

  cli: { migrationsDir: 'src/migrations' },
  logging: Boolean(DATABASE_LOGGING),
  namingStrategy: new SnakeNamingStrategy(),
};

export const developmentConfig = {
  ...postgresConfig,
};

export const productionConfig = {
  ...postgresConfig,
  /*  ssl: {
    rejectUnauthorized: false,
  }, */
};
