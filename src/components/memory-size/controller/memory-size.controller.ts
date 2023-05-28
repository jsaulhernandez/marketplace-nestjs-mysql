import {
    ClassSerializerInterceptor,
    Controller,
    Inject,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MemorySizeServiceInterface } from '../service/memory-size.service.interface';

@ApiTags('Memories Size')
@Controller('memory-size')
@UseInterceptors(ClassSerializerInterceptor)
export class MemorySizeController {
    constructor(
        @Inject('MemorySizeServiceInterface')
        private readonly memorySizeService: MemorySizeServiceInterface,
    ) {}
}
