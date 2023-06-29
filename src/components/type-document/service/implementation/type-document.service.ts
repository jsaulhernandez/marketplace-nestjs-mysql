import { Inject, Injectable } from '@nestjs/common';

import { TypeDocumentServiceInterface } from '../type-document.service.interface';
import { TypeDocumentRepositoryInterface } from '../../repository/type-document.repository.interface';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

import { TypeDocumentDTO } from 'src/dto/type-document.dto';

import { ErrorManager } from 'src/common/exceptions/ErrorManager.exception';

@Injectable()
export class TypeDocumentService implements TypeDocumentServiceInterface {
    constructor(
        @Inject('TypeDocumentRepositoryInterface')
        private typeDocumentRepository: TypeDocumentRepositoryInterface,
    ) {}

    Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<TypeDocumentDTO>> {
        return this.typeDocumentRepository.Paginate(pageOptionsDto, search);
    }

    create(typeDocument: TypeDocumentDTO): Promise<TypeDocumentDTO> {
        return this.typeDocumentRepository.save(typeDocument);
    }

    async update(id: number, typeDocument: TypeDocumentDTO): Promise<TypeDocumentDTO> {
        try {
            const result = await this.typeDocumentRepository.findOne({ id });
            if (!result)
                throw new ErrorManager(
                    'NOT_FOUND',
                    `Type document to update doesn't exists`,
                );

            const newTypeDocument = Object.assign(result, typeDocument);

            return this.typeDocumentRepository.save(newTypeDocument);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const typeDocument: TypeDocumentDTO =
                await this.typeDocumentRepository.findOneBy({
                    id,
                });
            if (!typeDocument)
                throw new ErrorManager(
                    'NOT_FOUND',
                    `Type document to delete doesn't exists`,
                );

            this.typeDocumentRepository.delete(typeDocument.id);

            return true;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    getTypesDocuments(): Promise<TypeDocumentDTO[]> {
        return this.typeDocumentRepository.findByCondition({ status: 1 });
    }
}
