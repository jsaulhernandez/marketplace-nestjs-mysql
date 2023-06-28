import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { SaleHeaderModel } from 'src/entities/sale-header.entity';

export interface SaleRepositoryInterface
    extends BaseInterfaceRepository<SaleHeaderModel> {}
