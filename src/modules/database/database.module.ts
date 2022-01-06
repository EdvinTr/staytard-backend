import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import postgresConfig from './postgres.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...postgresConfig,
    }),
  ],
})
export class DatabaseModule {}
