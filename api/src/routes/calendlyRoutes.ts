import express from 'express';

import * as controller from '../controllers/calendly/index';
import middleware from '../controllers/middleware';
import Scope from '../types/scopes';

export const router = express.Router();

router.get('/calendlys', middleware.authorize(Scope.ReadCalendlys), controller.getCalendlys);
router.post('/calendlys/', middleware.authorize(Scope.CreateCalendlys), middleware.checkTOSAgreement(), controller.postCalendly);
router.patch('/calendlys/:calendly', middleware.authorize(Scope.UpdateCalendlys), middleware.checkTOSAgreement(), controller.patchCalendly);

export default router;
