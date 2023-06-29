import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeDocumentModel } from 'src/entities/type-document.entity';

import { TypeDocumentController } from './controller/type-document.controller';
import { TypeDocumentRepository } from './repository/implementation/type-document.repository';
import { TypeDocumentService } from './service/implementation/type-document.service';

@Module({
    imports: [TypeOrmModule.forFeature([TypeDocumentModel])],
    controllers: [TypeDocumentController],
    providers: [
        {
            provide: 'TypeDocumentRepositoryInterface',
            useClass: TypeDocumentRepository,
        },
        {
            provide: 'TypeDocumentServiceInterface',
            useClass: TypeDocumentService,
        },
    ],
})
export class TypeDocumentModule {}
