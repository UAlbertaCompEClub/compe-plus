import { Request, Response } from 'express';
import logging from '../util/logging';

const NAMESPACE = 'Sample Controller';

const sampleHealthCheck = (req: Request, res: Response): Response => {
  logging.info(NAMESPACE, 'Sample health check route called.');
  logging.info(NAMESPACE, 'test github actions no package-lock.json change');

  return res.status(200).json({ message: 'pong' });
};

export default { sampleHealthCheck };
