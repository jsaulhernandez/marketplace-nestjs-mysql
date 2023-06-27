import { Module } from '@nestjs/common';
import { SaleController } from './controller/sale.controller';
import { SaleService } from './service/sale.service';

@Module({
  controllers: [SaleController],
  providers: [SaleService]
})
export class SaleModule {}
