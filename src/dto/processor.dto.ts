import { ApiProperty } from '@nestjs/swagger';

export class ProcessorDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    status: number;
}
