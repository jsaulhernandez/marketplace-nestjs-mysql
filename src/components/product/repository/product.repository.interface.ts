import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { ProductModel } from 'src/entities/product.entity';
import { ProductDTO } from 'src/dto/product.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';

export interface ProductRepositoryInterface
    extends BaseInterfaceRepository<ProductModel> {
    PaginateWeb(
        pageOptionsDto: PageOptionsDto,
        category: number,
        startPrice: number,
        endPrice: number,
        payMethod: number,
        withoutFilters: boolean,
    ): Promise<PageDto<ProductDTO>>;
}
