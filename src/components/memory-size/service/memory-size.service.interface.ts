import { MemorySizeDTO } from 'src/dto/memory-size.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

export interface MemorySizeServiceInterface {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<MemorySizeDTO>>;

    create(color: MemorySizeDTO): Promise<MemorySizeDTO>;

    update(id: number, color: MemorySizeDTO): Promise<MemorySizeDTO>;

    delete(id: number): Promise<boolean>;
}
