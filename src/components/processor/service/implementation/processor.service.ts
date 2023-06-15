import { Inject, Injectable } from '@nestjs/common';

import { ProcessorServiceInterface } from '../processor.service.interface';
import { ProcessorRepositoryInterface } from '../../repository/processor.repository.interface';

import { ProcessorDTO } from 'src/dto/processor.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

import { ErrorManager } from 'src/common/exceptions/ErrorManager.exception';

@Injectable()
export class ProcessorService implements ProcessorServiceInterface {
    constructor(
        @Inject('ProcessorRepositoryInterface')
        private processorRepository: ProcessorRepositoryInterface,
    ) {}

    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<ProcessorDTO>> {
        return this.processorRepository.Paginate(pageOptionsDto, search);
    }

    create(processor: ProcessorDTO): Promise<ProcessorDTO> {
        return this.processorRepository.save(processor);
    }

    async update(id: number, processor: ProcessorDTO): Promise<ProcessorDTO> {
        try {
            const result = await this.processorRepository.findOne({ id });
            if (!result)
                throw new ErrorManager('NOT_FOUND', `Processor to update doesn't exists`);

            const newProcessor = Object.assign(result, processor);

            return this.processorRepository.save(newProcessor);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const processor: ProcessorDTO = await this.processorRepository.findOneBy({
                id,
            });
            if (!processor)
                throw new ErrorManager('NOT_FOUND', `Processor to delete doesn't exists`);

            this.processorRepository.delete(processor.id);

            return true;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
