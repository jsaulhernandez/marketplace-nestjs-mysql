import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
    @ApiPropertyOptional({ enum: UserStatus, default: UserStatus.ACTIVE })
    @IsEnum(UserStatus)
    status: UserStatus;
    @ApiProperty()
    createdAt: number;
    @ApiProperty()
    updatedAt: number;
    @ApiProperty()
    verifiedEmail: number;
    @ApiProperty()
    customer: CustomerDTO;
}
