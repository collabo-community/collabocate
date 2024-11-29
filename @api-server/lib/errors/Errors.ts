import { CustomError, HttpCode } from './CustomError';

// --- Error Classes ---
class NotFoundError extends CustomError {
  constructor(message: string){
    super(message, HttpCode.NOT_FOUND)
  }
}

class BadRequestError extends CustomError {
  constructor(message: string){
    super(message, HttpCode.BAD_REQUEST)
  }
}

class UnAuthorizedError extends CustomError {
  constructor(message: string){
    super(message, HttpCode.UNAUTHORIZED)
  }
}


// --- Make throwing the errors cleaner in appearance for use ---
interface ThrowError {
  notFoundErr: (message: string) => void;
  badRequestErr: (message: string) => void;
  unAuthorizedErr: (message: string) => void;
}

const throwError: ThrowError = {
  notFoundErr: (message) => { throw new NotFoundError(message); },
  badRequestErr: (message) => { throw new BadRequestError(message); },
  unAuthorizedErr: (message) => { throw new UnAuthorizedError(message); },
};

export const { notFoundErr, badRequestErr, unAuthorizedErr } = throwError;