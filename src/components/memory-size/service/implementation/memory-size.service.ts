import { Inject, Injectable } from '@nestjs/common';

import { MemorySizeRepositoryInterface } from '../../repository/memory-size.repository.interface';
import { MemorySizeServiceInterface } from '../memory-size.service.interface';

import { MemorySizeDTO } from 'src/dto/memory-size.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

import { ErrorManager } from 'src/common/exceptions/ErrorManager.exception';

@Injectable()
export class MemorySizeService implements MemorySizeServiceInterface {
    constructor(
        @Inject('MemorySizeRepositoryInterface')
        private memorySizeRepository: MemorySizeRepositoryInterface,
    ) {}

    async Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<MemorySizeDTO>> {
        return this.memorySizeRepository.Paginate(pageOptionsDto, search);
    }

    async create(color: MemorySizeDTO): Promise<MemorySizeDTO> {
        return this.memorySizeRepository.save(color);
    }

    async update(id: number, color: MemorySizeDTO): Promise<MemorySizeDTO> {
        try {
            const result = await this.memorySizeRepository.findOne({ id });
            if (!result)
                throw new ErrorManager(
                    'NOT_FOUND',
                    `Memory size to update doesn't exists`,
                );

            const newColor = Object.assign(result, color);

            return this.memorySizeRepository.save(newColor);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const category: MemorySizeDTO = await this.memorySizeRepository.findOneBy({
                id,
            });
            if (!category)
                throw new ErrorManager(
                    'NOT_FOUND',
                    `Memory size to delete doesn't exists`,
                );

            this.memorySizeRepository.delete(category.id);

            return true;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
