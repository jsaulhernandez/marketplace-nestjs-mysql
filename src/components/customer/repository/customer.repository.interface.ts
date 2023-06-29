import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

import { CustomerModel } from 'src/entities/customer.entity';

export interface CustomerRepositoryInterface {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<CustomerModel>>;
}
