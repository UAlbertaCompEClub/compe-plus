import { NextFunction, Request, Response } from 'express';

type Handler<P, RS, RQ, Q, L> = (req: Request<P, RS, RQ, Q, L>, res: Response<RS, L>, next: NextFunction) => Promise<void>;

/**
 * Wraps a given Express handler with exception handling to reduce boilerplate.
 * @param handler Express handler to wrap with exception handling.
 * @returns A wrapped Express handler.
 */
const controller = <P, RS, RQ, Q, L>(handler: Handler<P, RS, RQ, Q, L>): Handler<P, RS, RQ, Q, L> => {
    return async (req: Request<P, RS, RQ, Q, L>, res: Response<RS, L>, next: NextFunction): Promise<void> => {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

export default controller;
