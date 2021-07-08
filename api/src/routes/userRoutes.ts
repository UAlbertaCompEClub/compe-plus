import express from 'express';

import middleware from '../controllers/middleware';
import * as controller from '../controllers/user/index';
import NotImplementedException from '../exceptions/NotImplementedException';
import Scope from '../util/scopes';

export const router = express.Router();

router.get('/users', middleware.authorize(Scope.ReadUsers), () => {
    throw new NotImplementedException('GET /users');
});
router.post('/users', controller.postUser);

export default router;
