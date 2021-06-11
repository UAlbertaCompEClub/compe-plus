import express from 'express';

import middleware from './middleware';
import controller from '../controllers/sample';
import jwtAuthz from 'express-jwt-authz';

const router = express.Router();

router.use(middleware.checkJwt());

router.get('/ping', jwtAuthz(['call:ping']), controller.sampleHealthCheck);

export = router;
