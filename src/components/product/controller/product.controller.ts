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

import { ProductServiceInterface } from '../service/product.service.interface';

import { ProductDTO } from 'src/dto/product.dto';

import { ApiResponse } from 'src/common/decorators/api-response.decorator';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { ResponseDTO } from 'src/dto/response/response.dto';

import { Response } from 'src/utils/response.util';
import { PrefixWeb } from 'src/common/const';

@ApiTags('Products')
@Controller('product')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
    constructor(
        @Inject('ProductServiceInterface')
        private readonly productService: ProductServiceInterface,
    ) {}

    @Get()
    @ApiResponse(ProductDTO, PageDto)
    async Paginate(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query('search') search: string = '',
        @Query('category') category: number = 0,
    ): Promise<ResponseDTO<PageDto<ProductDTO>>> {
        const result = await this.productService.Paginate(
            pageOptionsDto,
            search,
            category,
        );

        return new Response<PageDto<ProductDTO>>().ok(result);
    }

    @Post()
    async create(@Body() product: ProductDTO): Promise<ResponseDTO<ProductDTO>> {
        const result = await this.productService.create(product);
        return new Response<ProductDTO>().created(result);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() product: ProductDTO,
    ): Promise<ResponseDTO<ProductDTO>> {
        const result = await this.productService.update(id, product);
        return new Response<ProductDTO>().ok(result);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDTO<boolean>> {
        const result: boolean = await this.productService.delete(id);
        return new Response<boolean>().ok(result);
    }

    /**
     * EP WEB
     */
    @Get(`/${PrefixWeb}/list`)
    @ApiResponse(ProductDTO, PageDto)
    async PaginateWeb(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query('search') search: string = '',
        @Query('category') category: number = 0,
        @Query('startPrice') startPrice: number = 0,
        @Query('endPrice') endPrice: number = 0,
        @Query('paymentMethod') paymentMethod: number = 0,
    ): Promise<ResponseDTO<PageDto<ProductDTO>>> {
        const result = await this.productService.PaginateWeb(
            pageOptionsDto,
            search,
            category,
            startPrice,
            endPrice,
            paymentMethod,
        );

        return new Response<PageDto<ProductDTO>>().ok(result);
    }
}
