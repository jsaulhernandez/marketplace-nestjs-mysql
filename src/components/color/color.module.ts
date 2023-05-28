import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColorController } from './controller/color.controller';

import { ColorModel } from 'src/entities/color.entity';

import { ColorRepository } from './repository/implementation/color.repository';
import { ColorService } from './service/implementation/color.service';

@Module({
    imports: [TypeOrmModule.forFeature([ColorModel])],
    controllers: [ColorController],
    providers: [
        {
            provide: 'ColorRepositoryInterface',
            useClass: ColorRepository,
        },
        {
            provide: 'ColorServiceInterface',
            useClass: ColorService,
        },
    ],
})
export class ColorModule {}
