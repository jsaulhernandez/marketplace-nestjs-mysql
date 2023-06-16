import { Inject, Injectable } from '@nestjs/common';

import { PaymentMethodServiceInterface } from '../payment-method.service.interface';
import { PaymentMethodRepositoryInterface } from '../../repository/payment-method.repository.interface';

import { PayMethodDTO } from 'src/dto/payment-method.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { ErrorManager } from 'src/common/exceptions/ErrorManager.exception';

@Injectable()
export class PaymentMethodService implements PaymentMethodServiceInterface {
    constructor(
        @Inject('PaymentMethodRepositoryInterface')
        private payMethodRepository: PaymentMethodRepositoryInterface,
    ) {}

    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<PayMethodDTO>> {
        return this.payMethodRepository.Paginate(pageOptionsDto, search);
    }

    create(payMethod: PayMethodDTO): Promise<PayMethodDTO> {
        return this.payMethodRepository.save(payMethod);
    }

    async update(id: number, payMethod: PayMethodDTO): Promise<PayMethodDTO> {
        try {
            const result = await this.payMethodRepository.findOne({ id });
            if (!result)
                throw new ErrorManager(
                    'NOT_FOUND',
                    `Pay method to update doesn't exists`,
                );

            const newPayMethod = Object.assign(result, payMethod);

            return this.payMethodRepository.save(newPayMethod);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const payMethod: PayMethodDTO = await this.payMethodRepository.findOneBy({
                id,
            });
            if (!payMethod)
                throw new ErrorManager(
                    'NOT_FOUND',
                    `Pay method to delete doesn't exists`,
                );

            this.payMethodRepository.delete(payMethod.id);

            return true;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    getPayMethods(): Promise<PayMethodDTO[]> {
        return this.payMethodRepository.findByCondition({ status: 1 });
    }
}