import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './controller/product.controller';

import { ProductModel } from 'src/entities/product.entity';

import { ProductService } from './service/implementation/product.service';
import { ProductRepository } from './repository/implementation/product.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ProductModel])],
    controllers: [ProductController],
    providers: [
        {
            provide: 'ProductRepositoryInterface',
            useClass: ProductRepository,
        },
        {
            provide: 'ProductServiceInterface',
            useClass: ProductService,
        },
    ],
})
export class ProductModule {}
