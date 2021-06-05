import cors from 'cors';
import express from 'express';
import http from 'http';

import logger from './util/logger';
import config from './util/config';
import sampleRoutes from './routes/sample';
import resumeReviewRoutes from './routes/resumeReview';
import middleware from './routes/middleware';
import sampleRoutes from './routes/sample';
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
router.use('/api/v1', sampleRoutes);
router.use('/api/v1', resumeReviewRoutes);

/** Error handling */
router.use(middleware.notFound());

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
    logger.info(`Server running on ${config.server.hostname}:${config.server.port}`);
    logger.debug({ config: config }, 'With the given configuration');
});
