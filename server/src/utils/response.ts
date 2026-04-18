import { Response, Request } from 'express';
import { ERROR_CODES } from './errorCodes.js';

export const sendSuccess = (res: Response, data: unknown, statusCode = 200, req?: Request): void => {
  if (statusCode === 201 && data && typeof data === 'object' && 'id' in data && req) {
    const location = `${req.protocol}://${req.get('host')}${req.originalUrl}/${(data as any).id}`;
    res.location(location);
  }
  res.status(statusCode).json({ success: true, data });
};

export const sendError = (res: Response, code: string, message: string, statusCode = 500): void => {
  res.status(statusCode).json({ success: false, code, message });
};

export const sendValidationError = (res: Response, message: string): void => {
  res.status(422).json({ success: false, code: ERROR_CODES.VALIDATION_ERROR, message });
};

export const sendNoContent = (res: Response): void => {
  res.status(204).send();
};
