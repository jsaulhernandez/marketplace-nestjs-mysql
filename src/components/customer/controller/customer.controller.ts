import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Inject,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CustomerServiceInterface } from '../service/customer.service.interface';

import { ApiResponse } from 'src/common/decorators/api-response.decorator';
import { Response } from 'src/utils/response.util';

import { CustomerDTO } from 'src/dto/customer.dto';

import { PageOptionsDto } from 'src/dto/pagination/page-options.dto';
import { ResponseDTO } from 'src/dto/response/response.dto';
import { PageDto } from 'src/dto/pagination/page.dto';

import { PrefixWeb } from 'src/common/const';

@ApiTags('Customers')
@Controller('customer')
@UseInterceptors(ClassSerializerInterceptor)
export class CustomerController {
    constructor(
        @Inject('CustomerServiceInterface')
        private readonly customerService: CustomerServiceInterface,
    ) {}

    @Get()
    @ApiResponse(CustomerDTO, PageDto)
    async Paginate(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query('search') search: string = '',
    ): Promise<ResponseDTO<PageDto<CustomerDTO>>> {
        const result = await this.customerService.Paginate(pageOptionsDto, search);

        return new Response<PageDto<CustomerDTO>>().ok(result);
    }

    /**
     * EP WEB
     */
    @Get(`/${PrefixWeb}/exists-document`)
    async existsCustomerDocument(
        @Query('document') document: string,
    ): Promise<ResponseDTO<boolean>> {
        const result: boolean = await this.customerService.existDocument(document);
        return new Response<boolean>().ok(result);
    }
}
