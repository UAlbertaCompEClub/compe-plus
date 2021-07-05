import { NextFunction, Request, Response } from 'express';
import jwt from 'express-jwt';
import jwtAuthz from 'express-jwt-authz';
import pinoExpressMiddleware from 'express-pino-logger';
import jwks from 'jwks-rsa';

import HttpException from '../exceptions/HttpException';
import NotAuthenticatedException from '../exceptions/NotAuthenticatedException';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import NotFoundException from '../exceptions/NotFoundException';
import config from '../util/config';
import logger, { standardSerializers, verboseSerializers } from '../util/logger';
import Scope from '../util/scopes';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type ErrMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => void;
type AuthMiddleware = [Middleware, ErrMiddleware];

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
function authenticate(): AuthMiddleware {
    const authenticateJwt = jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: config.auth0.jwks_uri,
        }),
        audience: config.auth0.audience,
        issuer: config.auth0.issuer,
        algorithms: ['RS256'],
    });

    const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
        // Pass on a converted error
        next(new NotAuthenticatedException());
    };

    return [authenticateJwt, errorHandler];
}

/**
 * Returns middleware that will ensure the client accessing is authorized and will return an error if they are not.
 * @returns authorize middleware.
 */
function authorize(scope: Scope): AuthMiddleware {
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
function authorizeAndFallThrough(scope: Scope): AuthMiddleware {
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
