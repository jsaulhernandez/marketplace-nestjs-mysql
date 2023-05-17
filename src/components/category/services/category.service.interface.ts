import { CategoryDTO } from 'src/dto/category.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { CategoryModel } from 'src/entities/category.entity';

export interface CategoryServiceInterface {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        filter: string,
    ): Promise<PageDto<CategoryDTO>>;

    create(category: CategoryDTO): Promise<CategoryModel>;
}
