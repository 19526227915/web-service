import { Injectable, HttpException, HttpStatus, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Response<T> {
  code: number
  message: string
  data: T
}

@Injectable()
export class CustomResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        code: HttpStatus.OK,
        message: '成功',
        data,
      })),
      catchError(err => {
        // 根据您的需求，这里可以捕获错误并返回一个错误状态码和自定义错误消息
        const code = err.status || 500;
        return throwError({
          code: code,
          data:{},
          message: err.message || '服务器内部错误',
        });

      }),
    );
  }
}