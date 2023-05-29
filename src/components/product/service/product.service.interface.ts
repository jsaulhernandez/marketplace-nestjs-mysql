import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { ProductDTO } from 'src/dto/product.dto';

export interface ProductServiceInterface {
    PaginateWeb(
        pageOptionsDto: PageOptionsDto,
        category: number,
        startPrice: number,
        endPrice: number,
        payMethod: number,
    ): Promise<PageDto<ProductDTO>>;
}
