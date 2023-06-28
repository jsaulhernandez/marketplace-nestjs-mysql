import { ApiProperty } from '@nestjs/swagger';

import { ColorDTO } from './color.dto';
import { MemorySizeDTO } from './memory-size.dto';
import { ProcessorDTO } from './processor.dto';
import { ProductDTO } from './product.dto';
import { SaleHeaderDTO } from './sale-header.dto';

export class SaleDetailDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    product: ProductDTO;
    @ApiProperty()
    color: ColorDTO;
    @ApiProperty()
    processor: ProcessorDTO;
    @ApiProperty()
    memorySize: MemorySizeDTO;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    price: number;
    @ApiProperty()
    note: string;
    @ApiProperty()
    saleHeader: SaleHeaderDTO;
}
