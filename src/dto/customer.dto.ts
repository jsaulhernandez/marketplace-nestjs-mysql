import { ApiProperty } from '@nestjs/swagger';
import { TypeDocumentDTO } from './type-document.dto';

export class CustomerDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    secondName: string;
    @ApiProperty()
    firstLastName: string;
    @ApiProperty()
    secondLastName: string;
    @ApiProperty()
    dateBirth: string;
    @ApiProperty()
    typeDocument: TypeDocumentDTO;
    @ApiProperty()
    document: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    terms: number;
}
