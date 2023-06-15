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

import { ColorServiceInterface } from '../service/color.service.interface';

import { ApiResponse } from 'src/common/decorators/api-response.decorator';
import { ColorDTO } from 'src/dto/color.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';

import { ResponseDTO } from 'src/dto/response/response.dto';
import { Response } from 'src/utils/response.util';

@ApiTags('Colors')
@Controller('color')
@UseInterceptors(ClassSerializerInterceptor)
export class ColorController {
    constructor(
        @Inject('ColorServiceInterface')
        private readonly colorService: ColorServiceInterface,
    ) {}

    @Get()
    @ApiResponse(ColorDTO, PageDto)
    async Paginate(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query('search') search: string = '',
    ): Promise<ResponseDTO<PageDto<ColorDTO>>> {
        const result = await this.colorService.Paginate(pageOptionsDto, search);
        return new Response<PageDto<ColorDTO>>().ok(result);
    }

    @Post()
    async create(@Body() color: ColorDTO): Promise<ResponseDTO<ColorDTO>> {
        const result = await this.colorService.create(color);
        return new Response<ColorDTO>().created(result);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() color: ColorDTO,
    ): Promise<ResponseDTO<ColorDTO>> {
        const result = await this.colorService.update(id, color);
        return new Response<ColorDTO>().ok(result);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDTO<number>> {
        await this.colorService.delete(id);
        return new Response<number>().ok(id);
    }
}
