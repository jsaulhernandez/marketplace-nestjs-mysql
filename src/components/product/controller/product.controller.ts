import {
    ClassSerializerInterceptor,
    Controller,
    Inject,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductServiceInterface } from '../service/product.service.interface';

@ApiTags('Products')
@Controller('product')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
    constructor(
        @Inject('ProductServiceInterface')
        private readonly productService: ProductServiceInterface,
    ) {}
}
