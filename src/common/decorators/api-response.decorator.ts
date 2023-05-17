import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { ResponseDTO } from 'src/dto/response/response.dto';
import { PageMetaDto } from 'src/dto/pagination/page-meta.dto';

export const ApiResponse = <TModel extends Type<any>, KPaginate extends Type<any>>(
    model: TModel,
    page?: KPaginate,
) => {
    return applyDecorators(
        page
            ? ApiExtraModels(ResponseDTO, PageMetaDto, model)
            : ApiExtraModels(ResponseDTO, model),
        ApiOkResponse({
            description: 'Successfully received model list',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ResponseDTO) },
                    {
                        properties: {
                            response: {
                                properties: page
                                    ? {
                                          content: {
                                              type: 'array',
                                              items: { $ref: getSchemaPath(model) },
                                          },
                                          page: {
                                              items: { $ref: getSchemaPath(PageMetaDto) },
                                          },
                                      }
                                    : {
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
