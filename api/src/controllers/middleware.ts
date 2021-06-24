import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from 'express-jwt';
import pinoExpressMiddleware from 'express-pino-logger';

import HttpException from '../exceptions/HttpException';
import NotAuthenticatedException from '../exceptions/NotAuthenticatedException';
import NotFoundException from '../exceptions/NotFoundException';
import config from '../util/config';
import { authenticateJwt } from '../util/jwt';
import logger, { standardSerializers, verboseSerializers } from '../util/logger';

type Middleware = (req: Request, res: Response, next?: NextFunction) => void;
type ErrMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => void;

/**
 * Returns middleware that will log every request.
 * @returns Logging middleware.
 */
function logRequest(): Middleware {
    const serializers = config.verbose ? verboseSerializers : standardSerializers;
    return pinoExpressMiddleware({ logger: logger, serializers: serializers });
}

/**
 * Returns middelware that will return a 404 and stop the request chain.
 * @returns NotFound middleware.
 */
function notFound(): Middleware {
    return () => {
        throw new NotFoundException();
    };
}

/**
 * Returns middleware that handles all exceptions that are thrown within the server.
 * @returns ErrMiddleware.
 */
function errorHandler(): ErrMiddleware {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        let outErr: HttpException;
        if (err instanceof HttpException) {
            // Handle a known server error
            outErr = err;
        } else if (err instanceof UnauthorizedError) {
            outErr = new NotAuthenticatedException();
        } else {
            // Handle an unknown error
            req.log.error({ error: err }, 'Unknown error');
            outErr = new HttpException(500, 'Unknown error');
        }
        res.status(outErr.status).json(outErr.serialize());
    };
}

/**
 * Returns middleware that will ensure the client accessing is authenticated.
 * @returns authenticate middleware.
 */
function authenticate(): Middleware {
    return (req: Request, res: Response, next?: NextFunction): void => {
        if (next === undefined) {
            return;
        }

        authenticateJwt(req, res, next);
    };
}

export default {
    logRequest,
    notFound,
    errorHandler,
    authenticate,
};
