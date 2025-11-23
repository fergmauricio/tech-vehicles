export const buildSuccessResponse = (data: any, path: string, correlationId: string) => ({
  success: true,
  data,
  timestamp: new Date().toISOString(),
  path,
  correlationId,
});
