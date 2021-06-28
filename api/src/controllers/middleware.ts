import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from 'express-jwt';
import jwtAuthz from 'express-jwt-authz';
import pinoExpressMiddleware from 'express-pino-logger';

import HttpException from '../exceptions/HttpException';
import NotAuthenticatedException from '../exceptions/NotAuthenticatedException';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import NotFoundException from '../exceptions/NotFoundException';
import config from '../util/config';
import { authenticateJwt } from '../util/jwt';
import logger, { standardSerializers, verboseSerializers } from '../util/logger';
import Scope from '../util/scopes';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type ErrMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => void;
type Anyware = Middleware | ErrMiddleware;

/**
 * Returns middleware that will log every request.
 * @returns Logging middleware.
 */
function logRequest(): Middleware {
    const serializers = config.verbose ? verboseSerializers : standardSerializers;
    return pinoExpressMiddleware({ logger: logger, serializers: serializers });
}

/**
 * Returns middleware that will return a 404 and stop the request chain.
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

// TODO update to follow style of authorize middleware
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

/**
 * Returns middleware that will ensure the client accessing is authorized and will return an error if they are not.
 * @returns authorize middleware.
 */
function authorize(scope: Scope): Anyware[] {
    // Check that the caller has the proper scopes
    const checkAuthorization = jwtAuthz([scope], { failWithError: true });

    // Catch errors thrown off by jwtAuthz and convert to NotAuthorizedException
    const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
        // Pass on a converted error
        next(new NotAuthorizedException());
    };
    return [checkAuthorization, errorHandler];
}

/**
 * Returns middleware that will ensure the client accessing is authorized and will continue matching routes if the are not.
 * @returns authorizeAndFallThrough middleware.
 */
function authorizeAndFallThrough(scope: Scope): Anyware[] {
    // Check that the caller has the proper scopes
    const checkAuthorization = jwtAuthz([scope], { failWithError: true });

    // Catch errors thrown off by jwtAuthz and fallthrough
    const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
        // Fallthrough to the next route in the router
        next('route');
    };
    return [checkAuthorization, errorHandler];
}

export default {
    logRequest,
    notFound,
    errorHandler,
    authenticate,
    authorize,
    authorizeAndFallThrough,
};
