import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { __isProduction__ } from '../../constants';
import { developmentConfig, productionConfig } from './postgres.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      __isProduction__ ? productionConfig : developmentConfig,
    ),
  ],
})
export class DatabaseModule {}
