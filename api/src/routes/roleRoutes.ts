import express from 'express';

import middleware from '../controllers/middleware';
import * as controller from '../controllers/roles/index';
import Scope from '../types/scopes';

export const router = express.Router();

router.get('/users/:userId/roles', middleware.authorize(Scope.ReadRoles), controller.getRoles);

router.put('/users/:userId/roles/:role', middleware.authorize(Scope.CreateRoles), controller.putRole);

export default router;
