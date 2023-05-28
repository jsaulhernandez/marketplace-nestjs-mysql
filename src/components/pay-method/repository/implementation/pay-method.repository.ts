import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PayMethodRepositoryInterface } from '../pay-method.repository.interface';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';

import { PayMethod } from 'src/entities/pay-method.entity';

@Injectable()
export class PayMethodRepository
    extends BaseAbstractRepository<PayMethod>
    implements PayMethodRepositoryInterface
{
    entityName: string = 'mkp_pay_method';

    constructor(
        @InjectRepository(PayMethod)
        private payMethodRepository: Repository<PayMethod>,
    ) {
        super(payMethodRepository);
    }
}
