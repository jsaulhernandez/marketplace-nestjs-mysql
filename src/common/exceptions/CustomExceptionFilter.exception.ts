import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { Response as Res } from 'src/utils/response.util';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(CustomExceptionFilter.name);

    catch(exception: HttpException, host: ArgumentsHost) {
        const statusMessage = exception.message.split(' :: ');
        const statusKey: keyof typeof HttpStatus =
            (statusMessage[0] in HttpStatus &&
                (statusMessage[0] as keyof typeof HttpStatus)) ||
            'INTERNAL_SERVER_ERROR';

        let body: any;
        let status: HttpStatus = HttpStatus[statusKey];

        if (statusKey === 'NOT_FOUND') body = new Res().notFound(statusMessage[1]);
        else if (statusKey === 'CONFLICT') body = new Res().conflict(statusMessage[1]);
        else if (statusKey === 'UNAUTHORIZED')
            body = new Res().unauthorized(statusMessage[1]);
        else if (statusKey === 'BAD_REQUEST')
            body = new Res().badRequest(statusMessage[1]);
        else body = new Res().server(exception.message);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        this.logger.error(
            `Got an exception: ${JSON.stringify({
                path: request.url,
                ...body,
            })}`,
        );

        response.status(status).json(body);
    }
}
