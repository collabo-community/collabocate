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


// --- Make throwing the errors cleaner in appearance for use ---
interface ThrowError {
  notFoundErr: (message: string) => void;
  badRequestErr: (message: string) => void;
}

const throwError: ThrowError = {
  notFoundErr: (message) => { throw new NotFoundError(message); },
  badRequestErr: (message) => { throw new BadRequestError(message); },
};

export const { notFoundErr, badRequestErr } = throwError;