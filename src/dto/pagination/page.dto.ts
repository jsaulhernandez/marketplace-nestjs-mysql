import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
    @IsArray()
    @ApiProperty({ isArray: true })
    readonly data: T[];

    @ApiProperty({ type: () => PageMetaDto })
    readonly page: PageMetaDto;

    constructor(content: T[], page: PageMetaDto) {
        this.data = content;
        this.page = page;
    }
}
