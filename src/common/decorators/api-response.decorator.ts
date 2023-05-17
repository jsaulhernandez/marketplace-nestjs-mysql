import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { Response } from 'src/utils/response.util';

export const ApiResponse = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiExtraModels(Response, model),
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
                                        items: { $ref: getSchemaPath(model) },
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
