import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle();
    }
}

// @Injectable()
// export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
//     intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
//         return next.handle().pipe(
//             map((data) => {
//                 console.log('1', data?.response?.content?.content);
//                 console.log('2', data?.response?.content);
//                 console.log('3', data?.response?.content);
//                 console.log('4', data);
//                 return {
//                     statusCode: context.switchToHttp().getResponse().statusCode,
//                     message: 'Operation carried out successfully!',
//                     response: {
//                         content:
//                            typeof data?.response?.content?.content!=="undefined" || typeof data?.response?.content!=="undefined"
//                                 ? data?.response?.content?.content ||
//                                   data?.response?.content
//                                 : data,
//                         page: data?.response?.content?.page,
//                     },
//                 };
//             }),
//         );
//     }
// }
