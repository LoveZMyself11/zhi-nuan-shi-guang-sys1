import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        message = (exceptionResponse as any).message || message;
        if (Array.isArray(message)) {
          message = message.join('; ');
        }
      }
    } else if (exception instanceof QueryFailedError) {
      // 严禁暴露 Oracle 底层 SQL 报错，统一返回服务异常
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Database operation failed';
      this.logger.error(
        `Oracle SQL Error: ${exception.message}`,
        exception.stack,
      );
    } else if (exception instanceof Error) {
      // 其他未知错误，记录日志但对外隐藏细节
      this.logger.error(`Unexpected Error: ${exception.message}`, exception.stack);
    }

    response.status(status).json({
      code: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
