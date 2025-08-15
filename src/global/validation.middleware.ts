import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestException('Request body is required');
    }
    next();
  }
}