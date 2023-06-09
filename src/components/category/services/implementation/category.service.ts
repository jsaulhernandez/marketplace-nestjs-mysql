import { Inject, Injectable } from '@nestjs/common';

import { CategoryServiceInterface } from '../category.service.interface';
import { CategoryRepositoryInterface } from '../../repository/category.repository.interface';

import { CategoryDTO } from 'src/dto/category.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { cleanFilter } from 'src/utils/strings.utils';

import { ErrorManager } from 'src/common/exceptions/ErrorManager.exception';

@Injectable()
export class CategoryService implements CategoryServiceInterface {
    constructor(
        @Inject('CategoryRepositoryInterface')
        private categoryRepository: CategoryRepositoryInterface,
    ) {}

    async Paginate(
        pageOptionsDto: PageOptionsDto,
        filter: string,
    ): Promise<PageDto<CategoryDTO>> {
        filter = cleanFilter(filter);

        return this.categoryRepository.Paginate(pageOptionsDto, filter);
    }

    async getCategories(): Promise<CategoryDTO[]> {
        return this.categoryRepository.findByCondition({ status: 1 });
    }

    async create(category: CategoryDTO): Promise<CategoryDTO> {
        return this.categoryRepository.save(category);
    }

    async update(id: number, category: CategoryDTO): Promise<CategoryDTO> {
        try {
            const result = await this.categoryRepository.findOne({ id });
            if (!result)
                throw new ErrorManager('NOT_FOUND', `Category to update doesn't exists`);

            const newCategory = Object.assign(result, category);

            return this.categoryRepository.save(newCategory);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const category: CategoryDTO = await this.categoryRepository.findOneBy({ id });
            if (!category)
                throw new ErrorManager('NOT_FOUND', `Category to delete doesn't exists`);

            this.categoryRepository.delete(category.id);

            return true;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
