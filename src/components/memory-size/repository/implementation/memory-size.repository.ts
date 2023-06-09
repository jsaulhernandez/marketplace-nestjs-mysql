import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { MemorySizeRepositoryInterface } from '../memory-size.repository.interface';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';

import { MemorySizeModel } from 'src/entities/memory-size.entity';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageMetaDto } from 'src/dto/pagination/page-meta.dto';

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

    public async Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<MemorySizeModel>> {
        const [entities, itemCount] = await this.memorySizeRepository.findAndCount({
            where: [
                {
                    value: Like(`%${search}%`),
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
