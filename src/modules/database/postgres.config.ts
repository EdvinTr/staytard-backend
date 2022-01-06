/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { __isProduction__ } from '../../constants';
dotenv.config();

const {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
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
  synchronize: __isProduction__ ? false : true,
  migrations: [__dirname + '/../../../dist/migrations/**/*{.ts,.js}'],

  migrationsRun: true,
  cli: { migrationsDir: 'src/migrations' },
  logging: __isProduction__ ? false : true,
};

export default postgresConfig;
