import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProcessorRepositoryInterface } from '../processor.repository.interface';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';

import { ProcessorModel } from 'src/entities/processor.entity';

@Injectable()
export class ProcessorRepository
    extends BaseAbstractRepository<ProcessorModel>
    implements ProcessorRepositoryInterface
{
    entityName: string = 'mkp_processor';

    constructor(
        @InjectRepository(ProcessorModel)
        private processorRepository: Repository<ProcessorModel>,
    ) {
        super(processorRepository);
    }
}
