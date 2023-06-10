import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { ProcessorModel } from 'src/entities/processor.entity';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

export interface ProcessorRepositoryInterface
    extends BaseInterfaceRepository<ProcessorModel> {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<ProcessorModel>>;
}
