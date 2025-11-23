import { v4 as uuid } from "uuid";
import { Request, Response, NextFunction } from "express";

interface RequestWithCorrelationId extends Request {
  correlationId: string;
}

export function CorrelationIdMiddleware(
  req: RequestWithCorrelationId,
  res: Response,
  next: NextFunction,
) {
  const correlationId = uuid();
  req.correlationId = correlationId;
  res.setHeader("X-Correlation-Id", correlationId);
  next();
}
