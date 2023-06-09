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

    async Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
        category: number,
    ): Promise<PageDto<ProductDTO>> {
        category = cleanFilterNumber(category);

        return this.productRepository.Paginate(pageOptionsDto, search, category);
    }

    async PaginateWeb(
        pageOptionsDto: PageOptionsDto,
        search: string,
        category: number,
        startPrice: number,
        endPrice: number,
        payMethod: number,
    ): Promise<PageDto<ProductDTO>> {
        category = cleanFilterNumber(category);
        startPrice = cleanFilterNumber(startPrice);
        endPrice = cleanFilterNumber(endPrice);
        payMethod = cleanFilterNumber(payMethod);

        const withoutFilters: boolean =
            category !== 0 || (startPrice !== 0 && endPrice !== 0) || payMethod !== 0;

        return this.productRepository.PaginateWeb(
            pageOptionsDto,
            search,
            category,
            startPrice,
            endPrice,
            payMethod,
            !withoutFilters,
        );
    }
}
