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

import { MemorySizeServiceInterface } from '../service/memory-size.service.interface';

import { MemorySizeDTO } from 'src/dto/memory-size.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { ApiResponse } from 'src/common/decorators/api-response.decorator';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { ResponseDTO } from 'src/dto/response/response.dto';
import { Response } from 'src/utils/response.util';

@ApiTags('Memories Size')
@Controller('memory-size')
@UseInterceptors(ClassSerializerInterceptor)
export class MemorySizeController {
    constructor(
        @Inject('MemorySizeServiceInterface')
        private readonly memorySizeService: MemorySizeServiceInterface,
    ) {}

    @Get()
    @ApiResponse(MemorySizeDTO, PageDto)
    async Paginate(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query('search') search: string = '',
    ): Promise<ResponseDTO<PageDto<MemorySizeDTO>>> {
        const result = await this.memorySizeService.Paginate(pageOptionsDto, search);
        return new Response<PageDto<MemorySizeDTO>>().ok(result);
    }

    @Post()
    async create(@Body() category: MemorySizeDTO): Promise<ResponseDTO<MemorySizeDTO>> {
        const result = await this.memorySizeService.create(category);
        return new Response<MemorySizeDTO>().created(result);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() category: MemorySizeDTO,
    ): Promise<ResponseDTO<MemorySizeDTO>> {
        const result = await this.memorySizeService.update(id, category);
        return new Response<MemorySizeDTO>().ok(result);
    }

    @Delete(':id')
    async deleteUser(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseDTO<boolean>> {
        const result: boolean = await this.memorySizeService.delete(id);
        return new Response<boolean>().ok(result);
    }
}
