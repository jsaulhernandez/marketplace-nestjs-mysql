import { ProcessorDTO } from 'src/dto/processor.dto';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

export interface ProcessorServiceInterface {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<ProcessorDTO>>;

    create(processor: ProcessorDTO): Promise<ProcessorDTO>;

    update(id: number, processor: ProcessorDTO): Promise<ProcessorDTO>;

    delete(id: number): Promise<boolean>;
}
