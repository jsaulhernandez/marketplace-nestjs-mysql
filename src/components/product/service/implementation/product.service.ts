import { Inject, Injectable } from '@nestjs/common';

import { ProductServiceInterface } from '../product.service.interface';
import { ProductRepositoryInterface } from '../../repository/product.repository.interface';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { ProductDTO } from 'src/dto/product.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { cleanFilterNumber } from 'src/utils/strings.utils';

@Injectable()
export class ProductService implements ProductServiceInterface {
    constructor(
        @Inject('ProductRepositoryInterface')
        private productRepository: ProductRepositoryInterface,
    ) {}

    async PaginateWeb(
        pageOptionsDto: PageOptionsDto,
        category: number,
        startPrice: number,
        endPrice: number,
        payMethod: number,
    ): Promise<PageDto<ProductDTO>> {
        category = cleanFilterNumber(category);
        startPrice = cleanFilterNumber(startPrice);
        endPrice = cleanFilterNumber(endPrice);
        payMethod = cleanFilterNumber(payMethod);

        return this.productRepository.PaginateWeb(
            pageOptionsDto,
            category,
            startPrice,
            endPrice,
            payMethod,
        );
    }
}
