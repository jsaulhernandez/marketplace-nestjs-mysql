import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

import { ResponseDTO } from 'src/dto/response/response.dto';

export class Response<T> {
    constructor() {}

    //200
    ok(data: T) {
        return new ResponseDTO<T>(
            'OK',
            HttpStatus.OK,
            'Operation carried out successfully',
            data,
        );
    }

    //201
    created(data: T) {
        return new ResponseDTO<T>(
            'CREATED',
            HttpStatus.CREATED,
            'Resource created successfully',
            data,
        );
    }

    //404
    notFound(data: T) {
        return new ResponseDTO<T>(
            'NOT_FOUND',
            HttpStatus.NOT_FOUND,
            'Resource not found',
            data,
        );
    }

    //409
    conflict(data: T) {
        return new ResponseDTO<T>(
            'CONFLICT',
            HttpStatus.CONFLICT,
            'The operation cannot be performed due to a conflict',
            data,
        );
    }

    //401
    unauthorized(data: T) {
        return new ResponseDTO<T>(
            'UNAUTHORIZED',
            HttpStatus.UNAUTHORIZED,
            `You don't have authorization`,
            data,
        );
    }

    //400
    badRequest(data: T) {
        return new ResponseDTO<T>(
            'BAD_REQUEST',
            HttpStatus.BAD_REQUEST,
            'Invalid information',
            data,
        );
    }

    //500
    server(data: T) {
        return new ResponseDTO<T>(
            'INTERNAL_SERVER_ERROR',
            HttpStatus.INTERNAL_SERVER_ERROR,
            'Internal server error',
            data,
        );
    }
}
