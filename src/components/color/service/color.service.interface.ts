import { ColorDTO } from 'src/dto/color.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

export interface ColorServiceInterface {
    Paginate(pageOptionsDto: PageOptionsDto, search: string): Promise<PageDto<ColorDTO>>;

    create(color: ColorDTO): Promise<ColorDTO>;

    update(id: number, color: ColorDTO): Promise<ColorDTO>;

    delete(id: number): Promise<boolean>;
}
