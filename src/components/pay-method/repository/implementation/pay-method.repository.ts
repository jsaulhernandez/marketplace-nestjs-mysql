import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PayMethodRepositoryInterface } from '../pay-method.repository.interface';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';

import { PayMethodModel } from 'src/entities/pay-method.entity';

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
}
