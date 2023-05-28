import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { PayMethod } from 'src/entities/pay-method.entity';

export interface PayMethodRepositoryInterface
    extends BaseInterfaceRepository<PayMethod> {}
