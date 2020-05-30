import { Request, Response } from 'express';
import { Controller, HttpRequest } from '../../presentation/protocols';

// eslint-disable-next-line import/prefer-default-export
export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
