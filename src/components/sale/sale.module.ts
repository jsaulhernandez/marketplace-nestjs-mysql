import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SaleController } from './controller/sale.controller';
import { SaleService } from './service/implementation/sale.service';

import { SaleRepository } from './repository/implementation/sale.repository';

import { SaleHeaderModel } from 'src/entities/sale-header.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SaleHeaderModel])],
    controllers: [SaleController],
    providers: [
        {
            provide: 'SaleRepositoryInterface',
            useClass: SaleRepository,
        },
        {
            provide: 'SaleServiceInterface',
            useClass: SaleService,
        },
    ],
})
export class SaleModule {}
