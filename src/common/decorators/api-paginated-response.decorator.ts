import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { PageDto } from 'src/dto/pagination/page.dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiExtraModels(PageDto, model),
        ApiOkResponse({
            description: 'Successfully received model list',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(PageDto) },
                    {
                        properties: {
                            content: {
                                type: 'array',
                                items: { $ref: getSchemaPath(model) },
                            },
                        },
                    },
                ],
            },
        }),
    );
};
