import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { mongo, Error } from 'mongoose';

@Catch(mongo.MongoServerError, Error.CastError)
export class MongooseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(MongooseExceptionFilter.name);

  catch(
    exception: mongo.MongoServerError | Error.CastError,
    host: ArgumentsHost,
  ) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    this.logger.error(exception.message);

    response.status(HttpStatus.BAD_REQUEST);
    response.json({
      message: 'Bad request',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
