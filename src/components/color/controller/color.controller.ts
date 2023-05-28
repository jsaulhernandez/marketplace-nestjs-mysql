import {
    ClassSerializerInterceptor,
    Controller,
    Inject,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ColorServiceInterface } from '../service/color.service.interface';

@ApiTags('Colors')
@Controller('color')
@UseInterceptors(ClassSerializerInterceptor)
export class ColorController {
    constructor(
        @Inject('ColorServiceInterface')
        private readonly colorService: ColorServiceInterface,
    ) {}
}
