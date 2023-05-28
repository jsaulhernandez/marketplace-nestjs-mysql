import { Inject, Injectable } from '@nestjs/common';

import { ColorRepositoryInterface } from '../../repository/color.repository.interface';
import { ColorServiceInterface } from '../color.service.interface';

@Injectable()
export class ColorService implements ColorServiceInterface {
    constructor(
        @Inject('ColorRepositoryInterface')
        private colorRepository: ColorRepositoryInterface,
    ) {}
}
