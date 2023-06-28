import { CustomerDTO } from './customer.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    status: number;
    @ApiProperty()
    createdAt: number;
    @ApiProperty()
    updatedAt: number;
    @ApiProperty()
    verifiedEmail: number;
    @ApiProperty()
    customer: CustomerDTO;
}
