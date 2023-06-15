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

    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<MemorySizeDTO>> {
        return this.memorySizeRepository.Paginate(pageOptionsDto, search);
    }

    create(memorySize: MemorySizeDTO): Promise<MemorySizeDTO> {
        return this.memorySizeRepository.save(memorySize);
    }

    async update(id: number, memorySize: MemorySizeDTO): Promise<MemorySizeDTO> {
        try {
            const result = await this.memorySizeRepository.findOne({ id });
            if (!result)
                throw new ErrorManager(
                    'NOT_FOUND',
                    `Memory size to update doesn't exists`,
                );

            const newMemorySize = Object.assign(result, memorySize);

            return this.memorySizeRepository.save(newMemorySize);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const memorySize: MemorySizeDTO = await this.memorySizeRepository.findOneBy({
                id,
            });
            if (!memorySize)
                throw new ErrorManager(
                    'NOT_FOUND',
                    `Memory size to delete doesn't exists`,
                );

            this.memorySizeRepository.delete(memorySize.id);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
