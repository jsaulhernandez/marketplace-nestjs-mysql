import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

import { CustomerDTO } from 'src/dto/customer.dto';

export interface CustomerServiceInterface {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<CustomerDTO>>;
}
