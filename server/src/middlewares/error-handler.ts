import { Request, Response, NextFunction } from 'express';

interface HttpError extends Error {
  status?: number;
}

export function errorHandler(err: HttpError, req: Request, res: Response) {
  const statusCode = err.status || 500;

  console.error(err);

  res.status(statusCode).json({
    status: statusCode,
    message: err.message || 'Internal Server Error',
  });
}
