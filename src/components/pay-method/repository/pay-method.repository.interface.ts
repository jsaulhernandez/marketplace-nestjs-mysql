import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { PayMethodModel } from 'src/entities/pay-method.entity';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

export interface PayMethodRepositoryInterface
    extends BaseInterfaceRepository<PayMethodModel> {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<PayMethodModel>>;
}
