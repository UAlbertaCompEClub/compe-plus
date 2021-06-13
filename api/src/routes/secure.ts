import express from 'express';

import middleware from './middleware';
import controller from '../controllers/sample';
import authorize from 'express-jwt-authz';

const router = express.Router();

router.use(middleware.authenticate());

router.get('/ping', authorize(['call:ping']), controller.sampleHealthCheck);

export = router;
