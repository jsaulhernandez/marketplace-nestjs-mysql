import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Inject,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiResponse } from 'src/common/decorators/api-response.decorator';
import { PrefixWeb } from 'src/common/const';

import { CategoryServiceInterface } from '../services/category.service.interface';

import { ResponseDTO } from 'src/dto/response/response.dto';
import { CategoryDTO } from 'src/dto/category.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';

import { Response } from 'src/utils/response.util';

@ApiTags('Categories')
@Controller('category')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {
    constructor(
        @Inject('CategoryServiceInterface')
        private readonly categoryService: CategoryServiceInterface,
    ) {}

    @Get()
    @ApiResponse(CategoryDTO, PageDto)
    async index(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query('filter') filter: string = '',
    ): Promise<ResponseDTO<PageDto<CategoryDTO>>> {
        const result = await this.categoryService.Paginate(pageOptionsDto, filter);
        return new Response<PageDto<CategoryDTO>>().ok(result);
    }

    @Post()
    async create(@Body() category: CategoryDTO): Promise<ResponseDTO<CategoryDTO>> {
        const result = await this.categoryService.create(category);
        return new Response<CategoryDTO>().created(result);
    }

    /**
     * EP WEB
     */
    @Get(`/${PrefixWeb}/active`)
    @ApiResponse(CategoryDTO)
    async getCategories(): Promise<ResponseDTO<CategoryDTO[]>> {
        const result = await this.categoryService.getCategories();
        return new Response<CategoryDTO[]>().ok(result);
    }
}
