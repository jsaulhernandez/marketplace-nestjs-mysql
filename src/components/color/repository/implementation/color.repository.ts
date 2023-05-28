import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';
import { ColorRepositoryInterface } from '../color.repository.interface';

import { ColorModel } from 'src/entities/color.entity';

@Injectable()
export class ColorRepository
    extends BaseAbstractRepository<ColorModel>
    implements ColorRepositoryInterface
{
    entityName: string = 'mkp_color';

    constructor(
        @InjectRepository(ColorModel)
        private colorRepository: Repository<ColorModel>,
    ) {
        super(colorRepository);
    }
}
