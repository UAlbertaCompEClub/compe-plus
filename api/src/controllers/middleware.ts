import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import jwt, { UnauthorizedError } from 'express-jwt';
import jwtAuthz from 'express-jwt-authz';
import pinoExpressMiddleware from 'express-pino-logger';
import jwks from 'jwks-rsa';

import HttpException from '../exceptions/HttpException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import InvalidJsonException from '../exceptions/InvalidJsonException';
import NotAuthenticatedException from '../exceptions/NotAuthenticatedException';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import NotFoundException from '../exceptions/NotFoundException';
import * as userRepository from '../repositories/userRepository';
import Scope from '../types/scopes';
import config from '../util/config';
import logger, { standardSerializers, verboseSerializers } from '../util/logger';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type AsyncMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;
type ErrMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => void;
type ErrHandledMiddleware = [Middleware, ErrMiddleware];

const AUTHZ_ERROR_MSG = 'Insufficient scope';

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

            // Additionally log 500 errors
            if (err instanceof InternalServerErrorException) {
                req.log.error({ error: err.error }, 'Internal server error');
            }
        } else {
            // Handle an unknown error
            req.log.error({ error: err, stackTrace: err.stack }, 'Unknown error');
            outErr = new HttpException(500, 'Unknown error');
        }
        res.status(outErr.status).json(outErr.serialize());
    };
}

/**
 * Returns middleware that will ensure the client accessing is authenticated.
 * @returns authenticate middleware.
 */
function authenticate(): ErrHandledMiddleware {
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
        if (err instanceof UnauthorizedError) {
            next(new NotAuthenticatedException());
        } else {
            next(err);
        }
    };

    return [authenticateJwt, errorHandler];
}

/**
 * Returns middleware that will ensure the client accessing is authorized and will return an error if they are not.
 * @returns authorize middleware.
 */
function authorize(scope: Scope): ErrHandledMiddleware {
    // Check that the caller has the proper scopes
    const checkAuthorization = jwtAuthz([scope], { failWithError: true });

    // Catch errors thrown off by jwtAuthz and convert to NotAuthorizedException
    const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
        // Pass on a converted error
        if (err.message === AUTHZ_ERROR_MSG) {
            next(new NotAuthorizedException());
        } else {
            next(err);
        }
    };
    return [checkAuthorization, errorHandler];
}

/**
 * Returns middleware that will ensure the client accessing is authorized and will continue matching routes if the are not.
 * @returns authorizeAndFallThrough middleware.
 */
function authorizeAndFallThrough(scope: Scope): ErrHandledMiddleware {
    // Check that the caller has the proper scopes
    const checkAuthorization = jwtAuthz([scope], { failWithError: true });

    // Catch errors thrown off by jwtAuthz and fallthrough
    const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
        // Fallthrough to the next route in the router
        if (err.message === AUTHZ_ERROR_MSG) {
            next('route');
        } else {
            next(err);
        }
    };
    return [checkAuthorization, errorHandler];
}

/**
 * Returns the middleware that will ensure the user is registered in our database and has agreed to our terms of service.
 * @returns registeredUser middleware.
 */
function registeredUser(): AsyncMiddleware {
    return async (req: Request, res: Response, next: NextFunction) => {
        const matches = await userRepository.get(req.user.sub);
        if (!(matches.length === 1 && matches[0].has_agreed_to_terms_of_service)) {
            next(
                new NotAuthorizedException({
                    reason: 'User has not agreed to terms of service',
                }),
            );
            return;
        }

        next();
    };
}

function jsonParser(): ErrHandledMiddleware {
    // Parse a json body
    const parseBody = express.json({
        limit: config.maxJsonSize,
    });

    // Catch parsing errors
    const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof SyntaxError) {
            // Pass on converted error
            next(new InvalidJsonException(err.message));
        } else {
            next(err);
        }
    };
    return [parseBody, errorHandler];
}

/**
 * Returns middleware that will attach the access-control-allow-origin header to client side requests.
 * @returns CORS middleware.
 */
function customizedCors(): Middleware {
    const allowedOrigins = config.corsAllowedOrigins;
    const allowedOriginsRegExp = allowedOrigins.map((allowedOrigin) => new RegExp(allowedOrigin.replace('*', '[\\w-]*')));

    return cors({
        origin: allowedOriginsRegExp,
    });
}

export default {
    logRequest,
    notFound,
    errorHandler,
    authenticate,
    registeredUser,
    authorize,
    authorizeAndFallThrough,
    jsonParser,
    cors: customizedCors,
};
