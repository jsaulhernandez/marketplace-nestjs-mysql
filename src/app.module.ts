import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
//import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmConfig } from './database/config/orm.config';
import { CategoryModule } from './components/category/category.module';
//import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor';
import { PaymentMethodModule } from './components/pay-method/payment-method.module';
import { ColorModule } from './components/color/color.module';
import { MemorySizeModule } from './components/memory-size/memory-size.module';
import { ProcessorModule } from './components/processor/processor.module';
import { ProductModule } from './components/product/product.module';
import { CustomExceptionFilter } from './common/exceptions/CustomExceptionFilter.exception';

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
        PaymentMethodModule,
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
        {
            provide: APP_FILTER,
            useClass: CustomExceptionFilter,
        },
    ],
})
export class AppModule {}
