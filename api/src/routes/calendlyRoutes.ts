import express from 'express';

import * as controller from '../controllers/calendly/index';

export const router = express.Router();

// TODO protect these with authorization
router.get('/calendlys', controller.getCalendlys);
router.post('/calendlys/', controller.postCalendly);

export default router;
