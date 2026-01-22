import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'

interface ExceptionResponse {
  statusCode: number
  message: string | string[]
  error: string
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message: string | string[] = 'Internal server error'
    let error = 'Internal Server Error'

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()

      if (typeof exceptionResponse === 'string') {
        message = [exceptionResponse]
      }
      else if (Array.isArray(exceptionResponse)) {
        message = exceptionResponse.map(String)
      }
      else if (exceptionResponse && typeof exceptionResponse === 'object') {
        const response = exceptionResponse as ExceptionResponse
        if (Array.isArray(response.message)) {
          message = response.message.map(String)
        }
        else if (response.message) {
          message = [String(response.message)]
        }
        error = response.error || error
      }
    }
    else if (exception instanceof Error) {
      message = [exception.message]
      error = exception.name
    }

    // 记录错误日志
    this.logger.error(
      `Http Status: ${status} Error: ${JSON.stringify(exception)}`,
      exception instanceof Error ? exception.stack : ''
    )

    // 统一响应格式
    const errorMessage = Array.isArray(message) ? message.join('; ') : message
    response.status(status).json({
      code: status,
      data: null,
      msg: errorMessage || '请求处理失败',
      timestamp: new Date().toISOString(),
      path: request.url
    })
  }
}
