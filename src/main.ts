import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { APIPrefix } from './common/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(morgan('dev'));

    const configService = app.get(ConfigService);

    app.setGlobalPrefix(APIPrefix.Version);
    console.log(
        'listen',
        configService.get('port'),
        'host',
        configService.get('host'),
        process.env.NODE_ENV,
    );
    await app.listen(configService.get('port'), configService.get('host'));
    console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
