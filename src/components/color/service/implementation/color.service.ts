import { Inject, Injectable } from '@nestjs/common';

import { ColorRepositoryInterface } from '../../repository/color.repository.interface';
import { ColorServiceInterface } from '../color.service.interface';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { ColorDTO } from 'src/dto/color.dto';

import { ErrorManager } from 'src/common/exceptions/ErrorManager.exception';

@Injectable()
export class ColorService implements ColorServiceInterface {
    constructor(
        @Inject('ColorRepositoryInterface')
        private colorRepository: ColorRepositoryInterface,
    ) {}

    Paginate(pageOptionsDto: PageOptionsDto, search: string): Promise<PageDto<ColorDTO>> {
        return this.colorRepository.Paginate(pageOptionsDto, search);
    }

    getColors(): Promise<ColorDTO[]> {
        return this.colorRepository.findByCondition({ status: 1 });
    }

    create(color: ColorDTO): Promise<ColorDTO> {
        return this.colorRepository.save(color);
    }

    async update(id: number, color: ColorDTO): Promise<ColorDTO> {
        try {
            const result = await this.colorRepository.findOne({ id });
            if (!result)
                throw new ErrorManager('NOT_FOUND', `Color to update doesn't exists`);

            const newColor = Object.assign(result, color);

            return this.colorRepository.save(newColor);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const color: ColorDTO = await this.colorRepository.findOneBy({ id });
            if (!color)
                throw new ErrorManager('NOT_FOUND', `Color to delete doesn't exists`);

            await this.colorRepository.delete(color.id);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
