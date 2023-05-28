import { Inject, Injectable } from '@nestjs/common';

import { ProcessorServiceInterface } from '../processor.service.interface';
import { ProcessorRepositoryInterface } from '../../repository/processor.repository.interface';

@Injectable()
export class ProcessorService implements ProcessorServiceInterface {
    constructor(
        @Inject('ProcessorRepositoryInterface')
        private processorRepository: ProcessorRepositoryInterface,
    ) {}
}
