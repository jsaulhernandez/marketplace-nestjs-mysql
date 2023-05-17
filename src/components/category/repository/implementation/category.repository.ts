import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '../../../../repositories/base/base.abstract.repository';
import { CategoryRepositoryInterface } from '../category.repository.interface';

import { CategoryModel } from 'src/entities/category.entity';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageMetaDto } from 'src/dto/pagination/page-meta.dto';
import { CategoryDTO } from 'src/dto/category.dto';

@Injectable()
export class CategoryRepository
    extends BaseAbstractRepository<CategoryModel>
    implements CategoryRepositoryInterface
{
    entityName: string = 'mkp_category';

    constructor(
        @InjectRepository(CategoryModel)
        private categoryRepository: Repository<CategoryModel>,
    ) {
        super(categoryRepository);
    }

    public async Paginate(
        pageOptionsDto: PageOptionsDto,
        filter: string,
        orderBy: string = 'id',
    ): Promise<PageDto<CategoryDTO>> {
        const queryBuilder = this.categoryRepository.createQueryBuilder(this.entityName);

        if (filter)
            queryBuilder.where(`${this.entityName}.name LIKE :search`, {
                search: '%' + filter + '%',
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
