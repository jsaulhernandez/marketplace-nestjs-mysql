import { ApiProperty } from '@nestjs/swagger';

import { MemorySizeDTO } from './memory-size.dto';
import { ColorDTO } from './color.dto';
import { ProcessorDTO } from './processor.dto';
import { PaymentMethodDTO } from './payment-method.dto';
import { CategoryDTO } from './category.dto';

export class ProductDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    image: string;
    @ApiProperty()
    stock: number;
    @ApiProperty()
    price: number;
    @ApiProperty()
    status: number;
    @ApiProperty()
    detail: string;
    @ApiProperty()
    specification: string;
    @ApiProperty()
    memorySize: MemorySizeDTO[];
    @ApiProperty()
    color: ColorDTO[];
    @ApiProperty()
    processor: ProcessorDTO[];
    @ApiProperty()
    paymentMethod: PaymentMethodDTO[];
    @ApiProperty()
    category: CategoryDTO;
}
