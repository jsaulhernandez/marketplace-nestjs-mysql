import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { APIPrefix, SWAGGER } from './common/common';
import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    app.use(morgan('dev'));

    const configService = app.get(ConfigService);

    app.setGlobalPrefix(APIPrefix.Version);

    const config = new DocumentBuilder()
        .setTitle('Marketplace API')
        .setDescription('Aplicación para la venta de Gadgets')
        .setVersion(SWAGGER.Version)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

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
