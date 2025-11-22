export const buildSuccessResponse = (data: any, path: string) => ({
  success: true,
  data,
  timestamp: new Date().toISOString(),
  path,
});
