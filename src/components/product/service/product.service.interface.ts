import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { ProductDTO } from 'src/dto/product.dto';

export interface ProductServiceInterface {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
        category: number,
    ): Promise<PageDto<ProductDTO>>;

    PaginateWeb(
        pageOptionsDto: PageOptionsDto,
        search: string,
        category: number,
        startPrice: number,
        endPrice: number,
        payMethod: number,
    ): Promise<PageDto<ProductDTO>>;

    create(product: ProductDTO): Promise<ProductDTO>;

    update(id: number, product: ProductDTO): Promise<ProductDTO>;

    delete(id: number): Promise<boolean>;
}
