import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { UserStatus } from 'src/entities/enums/enums';
import { CustomerDTO } from './customer.dto';

export class UserDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty({
        description: 'User status list',
        isArray: true,
        enum: UserStatus,
        example: Object.keys(UserStatus),
    })
    @IsEnum(UserStatus)
    status: UserStatus;
    @ApiProperty()
    createdAt: string;
    @ApiProperty()
    updatedAt: string;
    @ApiProperty()
    verifiedEmail: number;
    @ApiProperty()
    customer: CustomerDTO;
}
