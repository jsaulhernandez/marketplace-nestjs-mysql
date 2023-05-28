import { CategoryDTO } from 'src/dto/category.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

export interface CategoryServiceInterface {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        filter: string,
    ): Promise<PageDto<CategoryDTO>>;

    create(category: CategoryDTO): Promise<CategoryDTO>;

    getCategories(): Promise<CategoryDTO[]>;
}
