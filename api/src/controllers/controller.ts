/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

type Handler = (req: Request<any>, res: Response<any>, next: NextFunction) => Promise<void>;

/**
 * Wraps a given Express handler with exception handling to reduce boilerplate.
 * @param handler Express handler to wrap with exception handling.
 * @returns A wrapped Express handler.
 */
const controller = (handler: Handler): Handler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

export default controller;
