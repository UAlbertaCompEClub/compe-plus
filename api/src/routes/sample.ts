import express from 'express';
import authorize from 'express-jwt-authz';

import controller from '../controllers/sample';

const router = express.Router();

router.get('/ping', authorize(['call:ping']), controller.sampleHealthCheck);

export default router;
