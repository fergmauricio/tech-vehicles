export class AppLogger {
  static log(message: string, meta?: Record<string, any>) {
    console.log(
      JSON.stringify({
        level: "info",
        message,
        timestamp: new Date().toISOString(),
        ...meta,
      }),
    );
  }

  static error(message: string, meta?: Record<string, any>) {
    console.error(
      JSON.stringify({
        level: "error",
        message,
        timestamp: new Date().toISOString(),
        ...meta,
      }),
    );
  }
}
