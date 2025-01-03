import { Inject, Injectable } from '@nestjs/common';

import { ProductServiceInterface } from '../product.service.interface';
import { ProductRepositoryInterface } from '../../repository/product.repository.interface';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { ProductDTO } from 'src/dto/product.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { cleanFilterNumber } from 'src/utils/strings.utils';

import { ErrorManager } from 'src/common/exceptions/ErrorManager.exception';

@Injectable()
export class ProductService implements ProductServiceInterface {
    constructor(
        @Inject('ProductRepositoryInterface')
        private productRepository: ProductRepositoryInterface,
    ) {}

    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
        category: number,
    ): Promise<PageDto<ProductDTO>> {
        category = cleanFilterNumber(category);

        return this.productRepository.Paginate(pageOptionsDto, search, category);
    }

    PaginateWeb(
        pageOptionsDto: PageOptionsDto,
        search: string,
        category: number,
        startPrice: number,
        endPrice: number,
        paymentMethod: number,
    ): Promise<PageDto<ProductDTO>> {
        category = cleanFilterNumber(category);
        startPrice = cleanFilterNumber(startPrice);
        endPrice = cleanFilterNumber(endPrice);
        paymentMethod = cleanFilterNumber(paymentMethod);

        const withoutFilters: boolean =
            category !== 0 || (startPrice !== 0 && endPrice !== 0) || paymentMethod !== 0;

        return this.productRepository.PaginateWeb(
            pageOptionsDto,
            search,
            category,
            startPrice,
            endPrice,
            paymentMethod,
            !withoutFilters,
        );
    }

    create(product: ProductDTO): Promise<ProductDTO> {
        return this.productRepository.save(product);
    }

    async update(id: number, product: ProductDTO): Promise<ProductDTO> {
        try {
            const result = await this.productRepository.findOne({ id });
            if (!result)
                throw new ErrorManager('NOT_FOUND', `Product to update doesn't exists`);

            const newProduct = Object.assign(result, product);

            return this.productRepository.save(newProduct);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const processor: ProductDTO = await this.productRepository.findOneBy({
                id,
            });
            if (!processor)
                throw new ErrorManager('NOT_FOUND', `Product to delete doesn't exists`);

            this.productRepository.delete(processor.id);

            return true;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
