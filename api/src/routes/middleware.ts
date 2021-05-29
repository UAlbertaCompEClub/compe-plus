import { NextFunction, Request, Response } from 'express';
import pinoExpressMiddleware from 'express-pino-logger';
import logger, { standardSerializers, verboseSerializers } from '../util/logger';
import config from '../util/config';

type Middleware = (req: Request, res: Response, next?: NextFunction) => void;

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
 * @returns NotFound middelware.
 */
function notFound(): Middleware {
    return (req: Request, res: Response): void => {
        const error = new Error('not found');

        res.status(404).json({ message: error.message });
    };
}

export default {
    logRequest,
    notFound,
};
