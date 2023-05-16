import { Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmConfig } from './database/config/orm.config';
import { CategoryModule } from './components/category/category.module';
import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [TypeOrmConfig],
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => configService.get('database')!,
            inject: [ConfigService],
        }),
        CategoryModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            scope: Scope.REQUEST,
            useClass: TransformInterceptor,
        },
    ],
})
export class AppModule {}
