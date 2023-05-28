import { Inject, Injectable } from '@nestjs/common';

import { MemorySizeRepositoryInterface } from '../../repository/memory-size.repository.interface';
import { MemorySizeServiceInterface } from '../memory-size.service.interface';

@Injectable()
export class MemorySizeService implements MemorySizeServiceInterface {
    constructor(
        @Inject('MemorySizeRepositoryInterface')
        private memorySizeRepository: MemorySizeRepositoryInterface,
    ) {}
}
