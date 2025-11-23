import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { ErrorCodes } from "../enums/error-codes.enum";
import type { ExceptionResponse } from "../types/exception-response";
import { buildErrorResponse } from "../utils/build-response-error.util";
import { AppLogger } from "../logger/app.logger";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private mapStatusToErrorCode(status: number): ErrorCodes {
    const map: Record<number, ErrorCodes> = {
      [HttpStatus.NOT_FOUND]: ErrorCodes.VEHICLE_NOT_FOUND,
      [HttpStatus.BAD_REQUEST]: ErrorCodes.DUPLICATE_FIELD,
    };

    return map[status] ?? ErrorCodes.INTERNAL_ERROR;
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Erro interno no servidor";
    let errorCode = ErrorCodes.INTERNAL_ERROR;
    let errors: { message: string }[] | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse() as ExceptionResponse;

      if (typeof res === "string") {
        message = res;
      } else if (typeof res === "object") {
        if (Array.isArray(res.message)) {
          message = "Dados inválidos.";
          errorCode = ErrorCodes.VALIDATION_ERROR;
          errors = res.message.map((msg) => ({ message: msg }));
        } else {
          message = res.message ?? message;
          errorCode = this.mapStatusToErrorCode(status);
        }
      }
    }

    const correlationId = request.correlationId || "";

    AppLogger.error("Captura de Erro", {
      status,
      message,
      errorCode,
      errors,
      path: request.url,
      correlationId,
    });

    response
      .status(status)
      .json(buildErrorResponse(errorCode, message, errors, request.url, correlationId));
  }
}
