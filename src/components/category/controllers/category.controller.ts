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

import { CategoryServiceInterface } from '../services/category.service.interface';

import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { ApiResponse } from 'src/common/decorators/api-response.decorator';

import { CategoryDTO } from 'src/dto/category.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';

import { PrefixWeb } from 'src/common/const';

@ApiTags('Categories')
@Controller('category')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {
    constructor(
        @Inject('CategoryServiceInterface')
        private readonly categoryService: CategoryServiceInterface,
    ) {}

    @Get()
    @ApiPaginatedResponse(CategoryDTO)
    async index(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query('filter') filter: string = '',
    ): Promise<PageDto<CategoryDTO>> {
        return await this.categoryService.Paginate(pageOptionsDto, filter);
    }

    @Post()
    async create(@Body() category: CategoryDTO): Promise<CategoryDTO> {
        return await this.categoryService.create(category);
    }

    /**
     * EP WEB
     */
    @Get(`/${PrefixWeb}`)
    @ApiResponse(CategoryDTO)
    async getCategories(): Promise<CategoryDTO[]> {
        return await this.categoryService.getCategories();
    }
}
