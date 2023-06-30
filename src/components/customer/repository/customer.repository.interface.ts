import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { CustomerModel } from 'src/entities/customer.entity';

export interface CustomerRepositoryInterface
    extends BaseInterfaceRepository<CustomerModel> {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<CustomerModel>>;
}
