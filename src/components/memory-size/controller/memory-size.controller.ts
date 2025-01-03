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

    @Get(`/active`)
    @ApiResponse(MemorySizeDTO)
    async getActiveMemorySizes(): Promise<ResponseDTO<MemorySizeDTO[]>> {
        const result = await this.memorySizeService.getMemorySizes();
        return new Response<MemorySizeDTO[]>().ok(result);
    }

    @Post()
    async create(@Body() memorySize: MemorySizeDTO): Promise<ResponseDTO<MemorySizeDTO>> {
        const result = await this.memorySizeService.create(memorySize);
        return new Response<MemorySizeDTO>().created(result);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() memorySize: MemorySizeDTO,
    ): Promise<ResponseDTO<MemorySizeDTO>> {
        const result = await this.memorySizeService.update(id, memorySize);
        return new Response<MemorySizeDTO>().ok(result);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDTO<number>> {
        await this.memorySizeService.delete(id);
        return new Response<number>().ok(id);
    }
}
