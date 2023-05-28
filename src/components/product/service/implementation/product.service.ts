import { Inject, Injectable } from '@nestjs/common';

import { ProductServiceInterface } from '../product.service.interface';
import { ProductRepositoryInterface } from '../../repository/product.repository.interface';

@Injectable()
export class ProductService implements ProductServiceInterface {
    constructor(
        @Inject('ProductRepositoryInterface')
        private productRepository: ProductRepositoryInterface,
    ) {}
}
