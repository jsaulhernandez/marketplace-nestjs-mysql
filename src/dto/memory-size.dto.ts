import { ApiProperty } from '@nestjs/swagger';

export class MemorySizeDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    value: string;
    @ApiProperty()
    status: number;
}
