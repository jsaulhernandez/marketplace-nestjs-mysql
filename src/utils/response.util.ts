import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { PageMetaDto } from 'src/dto/pagination/page-meta.dto';

export class CustomResponse<T> {
    @ApiProperty()
    content: T;
    @ApiPropertyOptional()
    page?: PageMetaDto;
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
