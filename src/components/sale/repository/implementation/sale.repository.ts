import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';
import { SaleRepositoryInterface } from '../sale.repository.interface';

import { SaleHeaderModel } from 'src/entities/sale-header.entity';

@Injectable()
export class SaleRepository
    extends BaseAbstractRepository<SaleHeaderModel>
    implements SaleRepositoryInterface
{
    entityName: string = 'mkp_sale_header';

    constructor(
        @InjectRepository(SaleHeaderModel)
        private saleRepository: Repository<SaleHeaderModel>,
    ) {
        super(saleRepository);
    }
}
