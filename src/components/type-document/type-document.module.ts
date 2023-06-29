import { Module } from '@nestjs/common';
import { TypeDocumentController } from './controller/type-document.controller';
import { TypeDocumentService } from './service/type-document.service';

@Module({
  controllers: [TypeDocumentController],
  providers: [TypeDocumentService]
})
export class TypeDocumentModule {}
