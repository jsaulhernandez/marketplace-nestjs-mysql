import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfig } from './database/config/orm.config';
import { CategoryModule } from './components/category/category.module';

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
    providers: [AppService],
})
export class AppModule {}
