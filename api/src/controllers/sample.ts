import { Request, Response } from 'express';

/**
 * Sample controller.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns HTPP response.
 */
const sampleHealthCheck = (req: Request, res: Response): Response => {
    req.log.info('Sample health check route called.');

    return res.status(200).json({ message: 'pong' });
};

export default { sampleHealthCheck };
