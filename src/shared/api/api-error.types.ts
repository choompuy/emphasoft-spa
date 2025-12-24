export type ApiFieldErrors = Record<string, string[]>;

export type ApiErrorResponse = {
    detail?: string;
} & ApiFieldErrors;
