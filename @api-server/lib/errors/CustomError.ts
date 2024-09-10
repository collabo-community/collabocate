export enum HttpCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export interface CustomErrorInterface {
  status?: HttpCode;
  message: string;
}

export class CustomError extends Error implements CustomErrorInterface {
  public readonly status: HttpCode;

  constructor(message: string, status: HttpCode) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.status = status;

    Error.captureStackTrace(this);
  }
}