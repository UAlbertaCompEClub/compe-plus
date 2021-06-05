import { Request, Response } from 'express';
import pool from '../util/pool';
import * as db from 'zapatos/db';

/**
 * Sample controller.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns HTTP response.
 */
const sampleHealthCheck = async (req: Request, res: Response): Promise<Response> => {
    req.log.debug('Sample health check route called.');

    // TODO remove - this is just an example of how Zapatos can be used.
    // In the future all DB access will be performed in the repository layer
    const allUsers = await db.select('users', db.all).run(pool);

    return res.status(200).json({ message: 'pong', allUsers: allUsers });
};

export default { sampleHealthCheck };
