import {
    ClassSerializerInterceptor,
    Controller,
    Inject,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProcessorServiceInterface } from '../service/processor.service.interface';

@ApiTags('Processors')
@Controller('processor')
@UseInterceptors(ClassSerializerInterceptor)
export class ProcessorController {
    constructor(
        @Inject('ProcessorServiceInterface')
        private readonly processorService: ProcessorServiceInterface,
    ) {}
}
