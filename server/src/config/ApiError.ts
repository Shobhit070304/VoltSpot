import { ERROR_CODES } from '../utils/errorCodes.js';

class ApiError extends Error {
  statusCode: number;
  code: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code || ERROR_CODES.INTERNAL_ERROR;
    this.isOperational = true; // marks it as intentional, not a bug
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
