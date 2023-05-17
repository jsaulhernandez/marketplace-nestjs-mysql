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

import { CategoryModel } from 'src/entities/category.entity';
import { CategoryDTO } from 'src/dto/category.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';

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
    async create(@Body() category: CategoryDTO): Promise<CategoryModel> {
        return await this.categoryService.create(category);
    }
}
