import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { MemorySizeModel } from 'src/entities/memory-size.entity';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

export interface MemorySizeRepositoryInterface
    extends BaseInterfaceRepository<MemorySizeModel> {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<MemorySizeModel>>;
}
