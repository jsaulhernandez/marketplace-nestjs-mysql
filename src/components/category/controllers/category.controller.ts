import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoryServiceInterface } from '../services/category.service.interface';

import { CategoryModel } from 'src/entities/category.entity';
import { CategoryDTO } from 'src/dto/category.dto';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
    constructor(
        @Inject('CategoryServiceInterface')
        private readonly categoryService: CategoryServiceInterface,
    ) {}

    @Get()
    async index(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query('filter') filter: string = '',
    ): Promise<PageDto<CategoryModel>> {
        return await this.categoryService.Paginate(pageOptionsDto, filter);
    }

    @Post()
    async create(@Body() category: CategoryDTO): Promise<CategoryModel> {
        return await this.categoryService.create(category);
    }
}
