import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TypeDocumentServiceInterface } from '../service/type-document.service.interface';

import { ApiResponse } from 'src/common/decorators/api-response.decorator';
import { TypeDocumentDTO } from 'src/dto/type-document.dto';

import { PageDto } from 'src/dto/pagination/page.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { ResponseDTO } from 'src/dto/response/response.dto';
import { Response } from 'src/utils/response.util';

import { PrefixWeb } from 'src/common/const';

@ApiTags('Types documents')
@Controller('type-document')
@UseInterceptors(ClassSerializerInterceptor)
export class TypeDocumentController {
    constructor(
        @Inject('TypeDocumentServiceInterface')
        private readonly typeDocumentService: TypeDocumentServiceInterface,
    ) {}

    @Get()
    @ApiResponse(TypeDocumentDTO, PageDto)
    async Paginate(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query('search') search: string = '',
    ): Promise<ResponseDTO<PageDto<TypeDocumentDTO>>> {
        const result = await this.typeDocumentService.Paginate(pageOptionsDto, search);
        return new Response<PageDto<TypeDocumentDTO>>().ok(result);
    }

    @Post()
    async create(
        @Body() typeDocument: TypeDocumentDTO,
    ): Promise<ResponseDTO<TypeDocumentDTO>> {
        const result = await this.typeDocumentService.create(typeDocument);
        return new Response<TypeDocumentDTO>().created(result);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() typeDocument: TypeDocumentDTO,
    ): Promise<ResponseDTO<TypeDocumentDTO>> {
        const result = await this.typeDocumentService.update(id, typeDocument);
        return new Response<TypeDocumentDTO>().ok(result);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDTO<boolean>> {
        const result: boolean = await this.typeDocumentService.delete(id);
        return new Response<boolean>().ok(result);
    }

    /**
     * EP WEB
     */
    @Get(`/${PrefixWeb}/active`)
    @ApiResponse(TypeDocumentDTO)
    async getPayMethods(): Promise<ResponseDTO<TypeDocumentDTO[]>> {
        const result = await this.typeDocumentService.getTypesDocuments();
        return new Response<TypeDocumentDTO[]>().ok(result);
    }
}
