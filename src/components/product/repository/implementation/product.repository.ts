import { Injectable } from '@nestjs/common';
import { Between, Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductRepositoryInterface } from '../product.repository.interface';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';

import { ProductModel } from 'src/entities/product.entity';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { ProductDTO } from 'src/dto/product.dto';
import { PageMetaDto } from 'src/dto/pagination/page-meta.dto';

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

    public async PaginateWeb(
        pageOptionsDto: PageOptionsDto,
        search: string,
        category: number,
        startPrice: number,
        endPrice: number,
        payMethod: number,
        withoutFilters: boolean,
    ): Promise<PageDto<ProductDTO>> {
        const [entities, itemCount] = await this.productRepository.findAndCount({
            where: [
                {
                    title: Like(`%${search}%`),
                },
                {
                    category: {
                        id:
                            category === 0
                                ? withoutFilters && search === ''
                                    ? MoreThan(category)
                                    : category
                                : category,
                    },
                },
                {
                    price:
                        startPrice === 0 && endPrice === 0
                            ? withoutFilters && search === ''
                                ? MoreThan(startPrice)
                                : startPrice
                            : Between(startPrice, endPrice),
                },
                {
                    payMethod: {
                        id:
                            payMethod === 0
                                ? withoutFilters && search === ''
                                    ? MoreThan(payMethod)
                                    : payMethod
                                : payMethod,
                    },
                },
            ],
            select: {
                memorySize: { id: true, value: true },
                color: { id: true, value: true },
                processor: { id: true, name: true },
                payMethod: { id: true, name: true },
                category: { name: true },
            },
            order: { id: pageOptionsDto.order },
            relations: {
                memorySize: true,
                color: true,
                processor: true,
                payMethod: true,
                category: true,
            },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.size,
        });

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageMetaDto);
    }
}
