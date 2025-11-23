import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { AppLogger } from "../logger/app.logger";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const { method, url } = req;
    const start = Date.now();

    const correlationId = req.correlationId;

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        AppLogger.log("Request feito", {
          method,
          url,
          duration,
          status: res.statusCode,
          correlationId,
        });
      }),
    );
  }
}
