import { Request, Response } from 'express';

const sampleHealthCheck = (req: Request, res: Response): Response => {
    req.log.info('Sample health check route called.');

    return res.status(200).json({ message: 'pong' });
};

export default { sampleHealthCheck };
