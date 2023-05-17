import { ApiProperty } from '@nestjs/swagger';

export class CustomResponse<T> {
    @ApiProperty()
    content: T | T[];
    @ApiProperty()
    page?: T;
}

export class Response<T extends Object> {
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    message: string;
    @ApiProperty({
        type: () => CustomResponse,
    })
    response: CustomResponse<T>;
}
