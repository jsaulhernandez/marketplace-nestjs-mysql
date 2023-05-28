import { ApiProperty } from '@nestjs/swagger';

export class ColorDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    value: string;
    @ApiProperty()
    status: number;
}
