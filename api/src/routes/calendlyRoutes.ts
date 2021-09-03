import express from 'express';

import * as controller from '../controllers/calendly/index';

export const router = express.Router();

// TODO protect this with authorization
router.post('/calendlys/', controller.postCalendly);

export default router;
