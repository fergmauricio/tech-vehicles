export type ExceptionResponse =
  | string
  | {
      message: string | string[];
      statusCode?: number;
      error?: string;
    };
