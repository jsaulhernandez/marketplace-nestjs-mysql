import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';
import { ColorRepositoryInterface } from '../color.repository.interface';

import { ColorModel } from 'src/entities/color.entity';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageMetaDto } from 'src/dto/pagination/page-meta.dto';

@Injectable()
export class ColorRepository
    extends BaseAbstractRepository<ColorModel>
    implements ColorRepositoryInterface
{
    entityName: string = 'mkp_color';

    constructor(
        @InjectRepository(ColorModel)
        private colorRepository: Repository<ColorModel>,
    ) {
        super(colorRepository);
    }

    public async Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<ColorModel>> {
        const [entities, itemCount] = await this.colorRepository.findAndCount({
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
