import express from 'express';

import * as controller from '../controllers/calendly/index';
import middleware from '../controllers/middleware';
import Scope from '../types/scopes';

export const router = express.Router();

router.get('/calendlys', middleware.authorize(Scope.ReadCalendlys), controller.getCalendlys);
router.post('/calendlys/', middleware.authorize(Scope.CreateCalendlys), controller.postCalendly);
router.patch('/calendlys/:calendly', middleware.authorize(Scope.UpdateCalendlys), controller.patchCalendly);

export default router;
