import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PayMethodDTO } from 'src/dto/pay-method.dto';

export interface PayMethodServiceInterface {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<PayMethodDTO>>;

    create(payMethod: PayMethodDTO): Promise<PayMethodDTO>;

    update(id: number, payMethod: PayMethodDTO): Promise<PayMethodDTO>;

    delete(id: number): Promise<boolean>;

    getPayMethods(): Promise<PayMethodDTO[]>;
}
