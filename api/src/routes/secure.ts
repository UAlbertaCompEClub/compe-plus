import express from 'express';

import middleware from './middleware';
import controller from '../controllers/sample';

const router = express.Router();

router.use(middleware.jwtCheck());

router.get('/reviews', controller.sampleHealthCheck);

export = router;
