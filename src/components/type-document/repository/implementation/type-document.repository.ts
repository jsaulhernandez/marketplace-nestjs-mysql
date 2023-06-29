import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { TypeDocumentModel } from 'src/entities/type-document.entity';

import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';
import { TypeDocumentRepositoryInterface } from '../type-document.repository.interface';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageMetaDto } from 'src/dto/pagination/page-meta.dto';

@Injectable()
export class TypeDocumentRepository
    extends BaseAbstractRepository<TypeDocumentModel>
    implements TypeDocumentRepositoryInterface
{
    entityName: string = 'mkp_type_document';

    constructor(
        @InjectRepository(TypeDocumentModel)
        private typeDocumentRepository: Repository<TypeDocumentModel>,
    ) {
        super(typeDocumentRepository);
    }

    public async Paginate(
        pageOptionsDto: PageOptionsDto,
        search: string,
    ): Promise<PageDto<TypeDocumentModel>> {
        const [entities, itemCount] = await this.typeDocumentRepository.findAndCount({
            where: [
                {
                    name: Like(`%${search}%`),
                },
            ],
            order: { id: pageOptionsDto.order },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.size,
        });

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageMetaDto);
    }
}
