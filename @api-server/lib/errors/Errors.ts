import { CustomError, HttpCode} from './CustomError';

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


class UnauthorizedError extends CustomError {
  constructor(message: string){
    super(message, HttpCode.UNAUTHORIZED)
  }
}


// --- Make throwing the errors cleaner in appearance for use ---
interface ThrowError {
  notFoundErr: (message: string) => void;
  badRequestErr: (message: string) => void;
  unauthorizedErr: (message: string) => void;
}

const throwError: ThrowError = {
  notFoundErr: (message) => { throw new NotFoundError(message); },
  badRequestErr: (message) => { throw new BadRequestError(message); },
  unauthorizedErr: (message) => { throw new UnauthorizedError(message); },
};

export const { notFoundErr, badRequestErr, unauthorizedErr } = throwError;