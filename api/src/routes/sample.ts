import express from 'express';
import controller from '../controllers/sample';
import authorize from 'express-jwt-authz';

const router = express.Router();

router.get('/ping', authorize(['call:ping']), controller.sampleHealthCheck);

export = router;
