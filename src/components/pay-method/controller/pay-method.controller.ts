import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Inject,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PayMethodServiceInterface } from '../service/pay-method.service.interface';

import { PrefixWeb } from 'src/common/const';
import { PayMethodDTO } from 'src/dto/pay-method.dto';
import { ResponseDTO } from 'src/dto/response/response.dto';
import { ApiResponse } from 'src/common/decorators/api-response.decorator';
import { Response } from 'src/utils/response.util';

@ApiTags('Pay methods')
@Controller('pay-method')
@UseInterceptors(ClassSerializerInterceptor)
export class PayMethodController {
    constructor(
        @Inject('PayMethodServiceInterface')
        private readonly payMethodService: PayMethodServiceInterface,
    ) {}

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
