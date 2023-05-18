import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO<T extends Object> {
    @ApiProperty()
    readonly status: string;
    @ApiProperty()
    readonly statusCode: number;
    @ApiProperty()
    readonly message: string;
    @ApiProperty({
        type: () => Object,
    })
    readonly response: Object;

    constructor(
        status: keyof typeof HttpStatus,
        statusCode: HttpStatus,
        message: string,
        data: T,
    ) {
        this.status = status;
        this.statusCode = statusCode;
        this.message = message;
        this.response = data['data'] ? data : { data: data };
    }
}
