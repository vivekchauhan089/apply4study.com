import { HttpException } from '@/Exceptions/HttpException';
import { logger } from '@/Utils/logger';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = true,
  whitelist = false,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    logger.info('validationMiddleware');
    validate(plainToInstance(type, req[value]), { forbidNonWhitelisted, skipMissingProperties, whitelist }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
