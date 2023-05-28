import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { ProcessorModel } from 'src/entities/processor.entity';

export interface ProcessorRepositoryInterface
    extends BaseInterfaceRepository<ProcessorModel> {}
