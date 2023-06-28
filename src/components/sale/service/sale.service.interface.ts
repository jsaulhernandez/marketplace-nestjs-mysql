import { SaleHeaderDTO } from 'src/dto/sale-header.dto';

export interface SaleServiceInterface {
    create(sale: SaleHeaderDTO): Promise<SaleHeaderDTO>;
}
