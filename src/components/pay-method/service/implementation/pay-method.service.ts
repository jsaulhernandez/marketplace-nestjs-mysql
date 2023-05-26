import { Inject, Injectable } from '@nestjs/common';

import { PayMethodServiceInterface } from '../pay-method.service.interface';
import { PayMethodRepositoryInterface } from '../../repository/pay-method.repository.interface';

import { PayMethodDTO } from 'src/dto/pay-method.dto';

@Injectable()
export class PayMethodService implements PayMethodServiceInterface {
    constructor(
        @Inject('PayMethodRepositoryInterface')
        private payMethodRepository: PayMethodRepositoryInterface,
    ) {}

    async getPayMethods(): Promise<PayMethodDTO[]> {
        return this.payMethodRepository.findByCondition({ status: 1 });
    }
}
