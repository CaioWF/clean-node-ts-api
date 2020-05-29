import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const contentType = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.type('json');
  next();
};
