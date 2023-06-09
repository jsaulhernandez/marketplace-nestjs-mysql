import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { ColorModel } from 'src/entities/color.entity';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

export interface ColorRepositoryInterface extends BaseInterfaceRepository<ColorModel> {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<ColorModel>>;
}
