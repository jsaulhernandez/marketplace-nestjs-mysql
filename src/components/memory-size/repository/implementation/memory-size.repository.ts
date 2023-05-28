import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { MemorySizeRepositoryInterface } from '../memory-size.repository.interface';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';

import { MemorySizeModel } from 'src/entities/memory-size.entity';

@Injectable()
export class MemorySizeRepository
    extends BaseAbstractRepository<MemorySizeModel>
    implements MemorySizeRepositoryInterface
{
    entityName: string = 'mkp_memory_size';

    constructor(
        @InjectRepository(MemorySizeModel)
        private memorySizeRepository: Repository<MemorySizeModel>,
    ) {
        super(memorySizeRepository);
    }
}
