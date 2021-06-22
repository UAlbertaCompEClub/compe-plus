import pino from 'pino';

import config from './config';

/**
 * Global logger object.
 */
const logger = pino({
    timestamp: pino.stdTimeFunctions.isoTime,
    base: null,
    formatters: {
        level: (label): { level: string } => {
            return { level: label };
        },
    },
    level: config.extraVerbose ? 'trace' : config.verbose ? 'debug' : 'info',
});

export default logger;

/**
 * Simplified serializers for Express objects (req, res, err). Most fields stripped out.
 */
const standardSerializers = {
    req: pino.stdSerializers.wrapRequestSerializer((req: pino.SerializedRequest): Record<string, unknown> => {
        const _req = {
            id: req.id,
            method: req.method,
            url: req.url,
        };
        return _req;
    }),
    res: pino.stdSerializers.wrapResponseSerializer((res: pino.SerializedResponse): Record<string, unknown> => {
        const _res = {
            statusCode: res.statusCode,
        };
        return _res;
    }),
    err: pino.stdSerializers.err,
};

/**
 * Verbose serializers for Express objects (req, res, err). No fields stripped out.
 */
const verboseSerializers = {};

export { standardSerializers, verboseSerializers };
