import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PageMetaDto } from 'src/dto/pagination/page-meta.dto';

import { Response } from 'src/utils/response.util';

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiExtraModels(Response, PageMetaDto, model),
        ApiOkResponse({
            description: 'Successfully received model list',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(Response) },
                    {
                        properties: {
                            response: {
                                properties: {
                                    content: {
                                        type: 'array',
                                        items: {
                                            $ref: getSchemaPath(model),
                                        },
                                    },
                                    page: {
                                        $ref: getSchemaPath(PageMetaDto),
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        }),
    );
};
