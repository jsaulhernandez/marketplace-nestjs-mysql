import { Inject, Injectable } from '@nestjs/common';

import { CategoryServiceInterface } from '../category.service.interface';
import { CategoryRepositoryInterface } from '../../repository/category.repository.interface';

import { CategoryDTO } from 'src/dto/category.dto';
import { CategoryModel } from 'src/entities/category.entity';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { cleanFilter } from 'src/utils/strings.utils';

@Injectable()
export class CategoryService implements CategoryServiceInterface {
    constructor(
        @Inject('CategoryRepositoryInterface')
        private categoryRepository: CategoryRepositoryInterface,
    ) {}

    async Paginate(
        pageOptionsDto: PageOptionsDto,
        filter: string,
    ): Promise<PageDto<CategoryModel>> {
        filter = cleanFilter(filter);

        return this.categoryRepository.Paginate(pageOptionsDto, filter);
    }

    async create(category: CategoryDTO): Promise<CategoryModel> {
        return this.categoryRepository.save(category);
    }
}
