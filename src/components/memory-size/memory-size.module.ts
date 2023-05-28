import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MemorySizeController } from './controller/memory-size.controller';

import { MemorySizeModel } from 'src/entities/memory-size.entity';

import { MemorySizeService } from './service/implementation/memory-size.service';
import { MemorySizeRepository } from './repository/implementation/memory-size.repository';

@Module({
    imports: [TypeOrmModule.forFeature([MemorySizeModel])],
    controllers: [MemorySizeController],
    providers: [
        {
            provide: 'MemorySizeRepositoryInterface',
            useClass: MemorySizeRepository,
        },
        {
            provide: 'MemorySizeServiceInterface',
            useClass: MemorySizeService,
        },
    ],
})
export class MemorySizeModule {}
