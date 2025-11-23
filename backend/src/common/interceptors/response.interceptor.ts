import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { buildSuccessResponse } from "../utils/build-response-success.util";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const path = request.url;
    const correlationId = request.correlationId;

    return next.handle().pipe(map((data) => buildSuccessResponse(data, path, correlationId)));
  }
}
