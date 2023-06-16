import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PayMethodDTO } from 'src/dto/payment-method.dto';

export interface PaymentMethodServiceInterface {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<PayMethodDTO>>;

    create(payMethod: PayMethodDTO): Promise<PayMethodDTO>;

    update(id: number, payMethod: PayMethodDTO): Promise<PayMethodDTO>;

    delete(id: number): Promise<boolean>;

    getPaymentMethods(): Promise<PayMethodDTO[]>;
}
