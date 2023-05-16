import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { CategoryModel } from 'src/entities/category.entity';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';

export interface CategoryRepositoryInterface
    extends BaseInterfaceRepository<CategoryModel> {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        filter: string,
        orderBy?: string,
    ): Promise<PageDto<CategoryModel>>;
}
