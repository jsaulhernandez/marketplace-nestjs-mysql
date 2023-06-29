import { TypeDocumentModel } from 'src/entities/type-document.entity';

import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

export interface TypeDocumentRepositoryInterface
    extends BaseInterfaceRepository<TypeDocumentModel> {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<TypeDocumentModel>>;
}
