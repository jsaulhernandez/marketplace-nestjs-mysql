import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

import { PaymentMethodDTO } from 'src/dto/payment-method.dto';

export interface PaymentMethodServiceInterface {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<PaymentMethodDTO>>;

    create(payMethod: PaymentMethodDTO): Promise<PaymentMethodDTO>;

    update(id: number, payMethod: PaymentMethodDTO): Promise<PaymentMethodDTO>;

    delete(id: number): Promise<boolean>;

    getPaymentMethods(): Promise<PaymentMethodDTO[]>;
}
