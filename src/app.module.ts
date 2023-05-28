import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmConfig } from './database/config/orm.config';
import { CategoryModule } from './components/category/category.module';
//import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor';
import { PayMethodModule } from './components/pay-method/pay-method.module';
import { ColorModule } from './components/color/color.module';
import { MemorySizeModule } from './components/memory-size/memory-size.module';
import { ProcessorModule } from './components/processor/processor.module';
import { ProductModule } from './components/product/product.module';

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
        PayMethodModule,
        ColorModule,
        MemorySizeModule,
        ProcessorModule,
        ProductModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // {
        //     provide: APP_INTERCEPTOR,
        //     scope: Scope.REQUEST,
        //     useClass: TransformInterceptor,
        // },
    ],
})
export class AppModule {}
