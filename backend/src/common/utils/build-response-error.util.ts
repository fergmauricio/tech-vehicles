import { ErrorCodes } from "../enums/error-codes.enum";

export const buildErrorResponse = (
  errorCode: ErrorCodes,
  message: string,
  errors: { message: string }[] | null,
  path: string,
) => ({
  success: false,
  errorCode,
  message,
  errors,
  timestamp: new Date().toISOString(),
  path,
});
