import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

import { TypeDocumentDTO } from 'src/dto/type-document.dto';

export interface TypeDocumentServiceInterface {
    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<TypeDocumentDTO>>;

    create(typeDocument: TypeDocumentDTO): Promise<TypeDocumentDTO>;

    update(id: number, typeDocument: TypeDocumentDTO): Promise<TypeDocumentDTO>;

    delete(id: number): Promise<boolean>;

    getTypesDocuments(): Promise<TypeDocumentDTO[]>;
}
