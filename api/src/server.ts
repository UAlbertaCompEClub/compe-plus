import cors from 'cors';
import express from 'express';
import http from 'http';

import middleware from './controllers/middleware';
import resumeReviewRoutes from './routes/resumeReviewRoute';
import config from './util/config';
import logger from './util/logger';

const router = express();

/** Allow cross origin requests */
router.use(cors());

/** Log the request */
router.use(middleware.logRequest());

/** Parse the request */
router.use(express.json());

/** Require valid JWT for any endpoint */
router.use(middleware.authenticate());

/** Routes */
router.use('/api/v1', resumeReviewRoutes);

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
