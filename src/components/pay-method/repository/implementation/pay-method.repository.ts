import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PayMethodRepositoryInterface } from '../pay-method.repository.interface';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';

import { PayMethodModel } from 'src/entities/pay-method.entity';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageMetaDto } from 'src/dto/pagination/page-meta.dto';

@Injectable()
export class PayMethodRepository
    extends BaseAbstractRepository<PayMethodModel>
    implements PayMethodRepositoryInterface
{
    entityName: string = 'mkp_pay_method';

    constructor(
        @InjectRepository(PayMethodModel)
        private payMethodRepository: Repository<PayMethodModel>,
    ) {
        super(payMethodRepository);
    }

    public async Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<PayMethodModel>> {
        const [entities, itemCount] = await this.payMethodRepository.findAndCount({
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
