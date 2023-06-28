import { Inject, Injectable } from '@nestjs/common';

import { SaleServiceInterface } from '../sale.service.interface';
import { SaleRepositoryInterface } from '../../repository/sale.repository.interface';

import { SaleHeaderDTO } from 'src/dto/sale-header.dto';

@Injectable()
export class SaleService implements SaleServiceInterface {
    constructor(
        @Inject('SaleRepositoryInterface')
        private saleRepository: SaleRepositoryInterface,
    ) {}

    create(sale: SaleHeaderDTO): Promise<SaleHeaderDTO> {
        return this.saleRepository.save(sale);
    }
}
