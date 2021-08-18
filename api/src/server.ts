import express from 'express';
import http from 'http';

import middleware from './controllers/middleware';
import documentRoutes from './routes/documentRoutes';
import resumeReviewRoutes from './routes/resumeReviewRoutes';
import userRoutes from './routes/userRoutes';
import config from './util/config';
import logger from './util/logger';

const router = express();

/** Log the request */
router.use(middleware.logRequest());

/** Allow cross origin requests */
router.use(middleware.cors());

/** Parse the request */
router.use(middleware.jsonParser());

/** Require valid JWT for any endpoint */
router.use(middleware.authenticate());

/** Routes */
router.use('/api/v1', userRoutes);
router.use('/api/v1', resumeReviewRoutes);
router.use('/api/v1', documentRoutes);

/** Not found */
router.use(middleware.notFound());

/** Error handling */
router.use(middleware.errorHandler());

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
    logger.debug({ config: config }, 'With the given configuration');
});
