import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { APIPrefix } from './common/common';
//import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor';
import { setupSwagger } from './utils/setup-swagger';
import { CustomExceptionFilter } from './common/exceptions/CustomExceptionFilter.exception';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: true,
    });
    //app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new CustomExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    app.use(morgan('dev'));

    const configService = app.get(ConfigService);

    app.setGlobalPrefix(APIPrefix.Version);

    setupSwagger(app);

    console.log(
        'listen=',
        configService.get('port'),
        'host=',
        configService.get('host'),
        'env=',
        'env.' + process.env.NODE_ENV,
    );
    await app.listen(configService.get('port'), configService.get('host'));
    console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
