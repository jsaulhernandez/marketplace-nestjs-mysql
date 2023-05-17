import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { Response } from 'src/utils/response.util';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(
            map((data) => ({
                statusCode: context.switchToHttp().getResponse().statusCode,
                message: 'Operation carried out successfully!',
                response: {
                    content:
                        typeof data?.response?.content?.content !== 'undefined' ||
                        typeof data?.response?.content !== 'undefined'
                            ? data?.response?.content?.content || data?.response?.content
                            : data,
                    page: data?.response?.content?.page,
                },
            })),
        );
    }
}
