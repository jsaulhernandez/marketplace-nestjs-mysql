import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Inject,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SaleServiceInterface } from '../service/sale.service.interface';

import { SaleHeaderDTO } from 'src/dto/sale-header.dto';

import { ResponseDTO } from 'src/dto/response/response.dto';
import { Response } from 'src/utils/response.util';

@ApiTags('Sells')
@Controller('sale')
@UseInterceptors(ClassSerializerInterceptor)
export class SaleController {
    constructor(
        @Inject('SaleServiceInterface')
        private readonly saleService: SaleServiceInterface,
    ) {}

    @Post()
    async create(@Body() product: SaleHeaderDTO): Promise<ResponseDTO<SaleHeaderDTO>> {
        const result = await this.saleService.create(product);
        return new Response<SaleHeaderDTO>().created(result);
    }
}
