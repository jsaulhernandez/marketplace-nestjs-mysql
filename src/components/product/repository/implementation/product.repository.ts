import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductRepositoryInterface } from '../product.repository.interface';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';

import { ProductModel } from 'src/entities/product.entity';

@Injectable()
export class ProductRepository
    extends BaseAbstractRepository<ProductModel>
    implements ProductRepositoryInterface
{
    entityName: string = 'mkp_product';

    constructor(
        @InjectRepository(ProductModel)
        private productRepository: Repository<ProductModel>,
    ) {
        super(productRepository);
    }
}
