import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomResponseInterceptor } from './Interceptor';

import { UserModule } from "./module/userModule"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomResponseInterceptor,
    },
  ],
})

export class AppModule {

}