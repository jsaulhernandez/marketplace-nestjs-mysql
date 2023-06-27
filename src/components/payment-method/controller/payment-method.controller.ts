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

import { PaymentMethodServiceInterface } from '../service/payment-method.service.interface';

import { PrefixWeb } from 'src/common/const';

import { PaymentMethodDTO } from 'src/dto/payment-method.dto';
import { ResponseDTO } from 'src/dto/response/response.dto';

import { ApiResponse } from 'src/common/decorators/api-response.decorator';

import { Response } from 'src/utils/response.util';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';

@ApiTags('Payment methods')
@Controller('payment-method')
@UseInterceptors(ClassSerializerInterceptor)
export class PaymentMethodController {
    constructor(
        @Inject('PaymentMethodServiceInterface')
        private readonly payMethodService: PaymentMethodServiceInterface,
    ) {}

    @Get()
    @ApiResponse(PaymentMethodDTO, PageDto)
    async Paginate(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query('search') search: string = '',
    ): Promise<ResponseDTO<PageDto<PaymentMethodDTO>>> {
        const result = await this.payMethodService.Paginate(pageOptionsDto, search);
        return new Response<PageDto<PaymentMethodDTO>>().ok(result);
    }

    @Get(`/active`)
    @ApiResponse(PaymentMethodDTO)
    async getActivePaymentMethods(): Promise<ResponseDTO<PaymentMethodDTO[]>> {
        const result = await this.payMethodService.getPaymentMethods();
        return new Response<PaymentMethodDTO[]>().ok(result);
    }

    @Post()
    async create(
        @Body() payMethod: PaymentMethodDTO,
    ): Promise<ResponseDTO<PaymentMethodDTO>> {
        const result = await this.payMethodService.create(payMethod);
        return new Response<PaymentMethodDTO>().created(result);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payMethod: PaymentMethodDTO,
    ): Promise<ResponseDTO<PaymentMethodDTO>> {
        const result = await this.payMethodService.update(id, payMethod);
        return new Response<PaymentMethodDTO>().ok(result);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDTO<boolean>> {
        const result: boolean = await this.payMethodService.delete(id);
        return new Response<boolean>().ok(result);
    }

    /**
     * EP WEB
     */
    @Get(`/${PrefixWeb}/active`)
    @ApiResponse(PaymentMethodDTO)
    async getPayMethods(): Promise<ResponseDTO<PaymentMethodDTO[]>> {
        const result = await this.payMethodService.getPaymentMethods();
        return new Response<PaymentMethodDTO[]>().ok(result);
    }
}
