import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: config,
      inject: [ConfigService],
    }),
    TasksModule,
  ],
})
export class AppModule {}
