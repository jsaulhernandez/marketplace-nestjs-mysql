import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PaymentMethodRepositoryInterface } from '../payment-method.repository.interface';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';

import { PaymentMethodModel } from 'src/entities/payment-method.entity';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageMetaDto } from 'src/dto/pagination/page-meta.dto';

@Injectable()
export class PaymentMethodRepository
    extends BaseAbstractRepository<PaymentMethodModel>
    implements PaymentMethodRepositoryInterface
{
    entityName: string = 'mkp_pay_method';

    constructor(
        @InjectRepository(PaymentMethodModel)
        private payMethodRepository: Repository<PaymentMethodModel>,
    ) {
        super(payMethodRepository);
    }

    public async Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<PaymentMethodModel>> {
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
