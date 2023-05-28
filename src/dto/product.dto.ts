import { ApiProperty } from '@nestjs/swagger';

import { MemorySizeDTO } from './memory-size.dto';
import { ColorDTO } from './color.dto';
import { ProcessorDTO } from './processor.dto';
import { PayMethodDTO } from './pay-method.dto';
import { CategoryDTO } from './category.dto';

export class ProductDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    description: string;
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
    payMethod: PayMethodDTO[];
    @ApiProperty()
    category: CategoryDTO;
}
