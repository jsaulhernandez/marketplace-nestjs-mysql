import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProcessorController } from './controller/processor.controller';

import { ProcessorModel } from 'src/entities/processor.entity';

import { ProcessorService } from './service/implementation/processor.service';
import { ProcessorRepository } from './repository/implementation/processor.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ProcessorModel])],
    controllers: [ProcessorController],
    providers: [
        {
            provide: 'ProcessorRepositoryInterface',
            useClass: ProcessorRepository,
        },
        {
            provide: 'ProcessorServiceInterface',
            useClass: ProcessorService,
        },
    ],
})
export class ProcessorModule {}
