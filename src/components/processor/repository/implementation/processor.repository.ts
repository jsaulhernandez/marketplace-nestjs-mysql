import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProcessorRepositoryInterface } from '../processor.repository.interface';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';

import { ProcessorModel } from 'src/entities/processor.entity';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageMetaDto } from 'src/dto/pagination/page-meta.dto';

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

    public async Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<ProcessorModel>> {
        const [entities, itemCount] = await this.processorRepository.findAndCount({
            where: [
                {
                    name: Like(`%${search}%`),
                },
            ],
            order: { id: pageOptionsDto.order },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.size,
        });

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageMetaDto);
    }
}
