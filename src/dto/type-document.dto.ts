import { ApiProperty } from '@nestjs/swagger';

export class TypeDocumentDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    masking: string;
    @ApiProperty()
    status: number;
}
