import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*');
  res.set('access-control-allow-methods', '*');
  res.set('access-control-allow-headers', '*');
  next();
};
