import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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
        category: number,
        startPrice: number,
        endPrice: number,
        payMethod: number,
        orderBy: string = 'id',
    ): Promise<PageDto<ProductDTO>> {
        const queryBuilder = this.productRepository
            .createQueryBuilder(this.entityName)
            .innerJoinAndSelect(`${this.entityName}.memorySize`, 'm')
            .innerJoinAndSelect(`${this.entityName}.color`, 'c')
            .innerJoinAndSelect(`${this.entityName}.processor`, 'p')
            .innerJoinAndSelect(`${this.entityName}.payMethod`, 'pm')
            .innerJoinAndSelect(`${this.entityName}.category`, 'cg');

        if (category || startPrice || endPrice || payMethod)
            queryBuilder
                .where('cg.id = :category', {
                    category: category,
                })
                .orWhere(`${this.entityName}.price BETWEEN :startPrice AND :endPrice`, {
                    startPrice: startPrice,
                    endPrice: endPrice,
                })
                .orWhere('pm.id = :method', {
                    method: payMethod,
                });

        if (orderBy)
            queryBuilder.orderBy(`${this.entityName}.${orderBy}`, pageOptionsDto.order);

        queryBuilder.skip(pageOptionsDto.skip).take(pageOptionsDto.size);

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageMetaDto);
    }
}
