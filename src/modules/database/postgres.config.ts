/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { __isProduction__ } from '../../constants';
dotenv.config();

const {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  DATABASE_LOGGING,
} = process.env;

// have to use exclamation mark because TS goes ballista if you try to use typeorm migration:revert command
const postgresConfig: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST!,
  port: +POSTGRES_PORT!,
  username: POSTGRES_USER!,
  password: POSTGRES_PASSWORD!,
  database: POSTGRES_DB!,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [
    __isProduction__
      ? __dirname + '/../../../dist/prod-migrations/**/*{.ts,.js}'
      : __dirname + '/../../../dist/migrations/**/*{.ts,.js}',
  ],

  migrationsRun: true,
  cli: { migrationsDir: 'src/migrations' },
  logging: Boolean(DATABASE_LOGGING),
  namingStrategy: new SnakeNamingStrategy(),
};

export const developmentConfig = {
  ...postgresConfig,
  synchronize: true,
};

export const productionConfig = {
  ...postgresConfig,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
};
