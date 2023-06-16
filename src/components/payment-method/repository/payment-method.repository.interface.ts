import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { PaymentMethodModel } from 'src/entities/payment-method.entity';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

export interface PaymentMethodRepositoryInterface
    extends BaseInterfaceRepository<PaymentMethodModel> {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<PaymentMethodModel>>;
}
