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

import { PayMethodServiceInterface } from '../service/pay-method.service.interface';

import { PrefixWeb } from 'src/common/const';
import { PayMethodDTO } from 'src/dto/pay-method.dto';
import { ResponseDTO } from 'src/dto/response/response.dto';
import { ApiResponse } from 'src/common/decorators/api-response.decorator';
import { Response } from 'src/utils/response.util';
import { PageDto } from 'src/dto/pagination/page.dto';
import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';

@ApiTags('Pay methods')
@Controller('pay-method')
@UseInterceptors(ClassSerializerInterceptor)
export class PayMethodController {
    constructor(
        @Inject('PayMethodServiceInterface')
        private readonly payMethodService: PayMethodServiceInterface,
    ) {}

    @Get()
    @ApiResponse(PayMethodDTO, PageDto)
    async Paginate(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query('search') search: string = '',
    ): Promise<ResponseDTO<PageDto<PayMethodDTO>>> {
        const result = await this.payMethodService.Paginate(pageOptionsDto, search);
        return new Response<PageDto<PayMethodDTO>>().ok(result);
    }

    @Post()
    async create(@Body() payMethod: PayMethodDTO): Promise<ResponseDTO<PayMethodDTO>> {
        const result = await this.payMethodService.create(payMethod);
        return new Response<PayMethodDTO>().created(result);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payMethod: PayMethodDTO,
    ): Promise<ResponseDTO<PayMethodDTO>> {
        const result = await this.payMethodService.update(id, payMethod);
        return new Response<PayMethodDTO>().ok(result);
    }

    @Delete(':id')
    async deleteUser(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseDTO<boolean>> {
        const result: boolean = await this.payMethodService.delete(id);
        return new Response<boolean>().ok(result);
    }

    /**
     * EP WEB
     */
    @Get(`/${PrefixWeb}/active`)
    @ApiResponse(PayMethodDTO)
    async getPayMethods(): Promise<ResponseDTO<PayMethodDTO[]>> {
        const result = await this.payMethodService.getPayMethods();
        return new Response<PayMethodDTO[]>().ok(result);
    }
}
