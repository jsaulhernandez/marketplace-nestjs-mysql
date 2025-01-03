import { Injectable } from '@nestjs/common';
import { Between, Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductRepositoryInterface } from '../product.repository.interface';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';

import { ProductModel } from 'src/entities/product.entity';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
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

    public async Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
        category: number,
    ): Promise<PageDto<ProductModel>> {
        const [entities, itemCount] = await this.productRepository.findAndCount({
            where: [
                {
                    title: search !== '' ? Like(`%${search}%`) : search,
                },
                {
                    name: search !== '' ? Like(`%${search}%`) : search,
                },
                {
                    category: {
                        id:
                            category === 0
                                ? search === ''
                                    ? MoreThan(category)
                                    : category
                                : category,
                    },
                },
            ],
            order: { id: pageOptionsDto.order },
            relations: {
                memorySize: true,
                color: true,
                processor: true,
                paymentMethod: true,
                category: true,
            },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.size,
        });

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageMetaDto);
    }

    public async PaginateWeb(
        pageOptionsDto: PageOptionsDto,
        search: string,
        category: number,
        startPrice: number,
        endPrice: number,
        paymentMethod: number,
        withoutFilters: boolean,
    ): Promise<PageDto<ProductModel>> {
        const [entities, itemCount] = await this.productRepository.findAndCount({
            where: [
                {
                    title: search !== '' ? Like(`%${search}%`) : search,
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
                    paymentMethod: {
                        id:
                            paymentMethod === 0
                                ? withoutFilters && search === ''
                                    ? MoreThan(paymentMethod)
                                    : paymentMethod
                                : paymentMethod,
                    },
                },
            ],
            select: {
                memorySize: { id: true, value: true },
                color: { id: true, value: true },
                processor: { id: true, name: true },
                paymentMethod: { id: true, name: true },
                category: { name: true },
            },
            order: { id: pageOptionsDto.order },
            relations: {
                memorySize: true,
                color: true,
                processor: true,
                paymentMethod: true,
                category: true,
            },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.size,
        });

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageMetaDto);
    }
}
