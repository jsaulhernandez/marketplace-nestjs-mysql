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

import { ProcessorServiceInterface } from '../service/processor.service.interface';

import { ProcessorDTO } from 'src/dto/processor.dto';

import { ApiResponse } from 'src/common/decorators/api-response.decorator';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { ResponseDTO } from 'src/dto/response/response.dto';
import { Response } from 'src/utils/response.util';

@ApiTags('Processors')
@Controller('processor')
@UseInterceptors(ClassSerializerInterceptor)
export class ProcessorController {
    constructor(
        @Inject('ProcessorServiceInterface')
        private readonly processorService: ProcessorServiceInterface,
    ) {}

    @Get()
    @ApiResponse(ProcessorDTO, PageDto)
    async Paginate(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query('search') search: string = '',
    ): Promise<ResponseDTO<PageDto<ProcessorDTO>>> {
        const result = await this.processorService.Paginate(pageOptionsDto, search);
        return new Response<PageDto<ProcessorDTO>>().ok(result);
    }

    @Post()
    async create(@Body() processor: ProcessorDTO): Promise<ResponseDTO<ProcessorDTO>> {
        const result = await this.processorService.create(processor);
        return new Response<ProcessorDTO>().created(result);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() processor: ProcessorDTO,
    ): Promise<ResponseDTO<ProcessorDTO>> {
        const result = await this.processorService.update(id, processor);
        return new Response<ProcessorDTO>().ok(result);
    }

    @Delete(':id')
    async deleteUser(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseDTO<boolean>> {
        const result: boolean = await this.processorService.delete(id);
        return new Response<boolean>().ok(result);
    }
}
