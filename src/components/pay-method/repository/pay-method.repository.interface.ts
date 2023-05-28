import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { PayMethodModel } from 'src/entities/pay-method.entity';

export interface PayMethodRepositoryInterface
    extends BaseInterfaceRepository<PayMethodModel> {}
