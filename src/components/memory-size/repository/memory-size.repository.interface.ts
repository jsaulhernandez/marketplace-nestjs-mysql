import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { MemorySizeModel } from 'src/entities/memory-size.entity';

export interface MemorySizeRepositoryInterface
    extends BaseInterfaceRepository<MemorySizeModel> {}
