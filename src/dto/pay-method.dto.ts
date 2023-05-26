import { ApiProperty } from '@nestjs/swagger';

export class PayMethodDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    image: string;
    @ApiProperty()
    status: number;
}
