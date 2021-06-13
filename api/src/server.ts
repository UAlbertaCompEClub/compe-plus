import http from 'http';
import express from 'express';
import cors from 'cors';

import logger from './util/logger';
import config from './util/config';
import sampleRoutes from './routes/sample';
import middleware from './routes/middleware';

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

/** Error handling */
router.use(middleware.notFound());

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logger.info({ config: config }, `Server running on ${config.server.hostname}:${config.server.port}`));
