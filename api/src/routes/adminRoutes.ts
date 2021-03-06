import express from 'express';

import * as controller from '../controllers/admin/index';
import middleware from '../controllers/middleware';
import Scope from '../types/scopes';

export const router = express.Router();

router.get('/admin/allUsers', middleware.authorize(Scope.ReadAllUsersRoles), controller.getAllUsersInfo);

export default router;
