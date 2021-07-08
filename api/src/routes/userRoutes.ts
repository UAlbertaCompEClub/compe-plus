import express from 'express';

import * as controller from '../controllers/user/index';
import NotImplementedException from '../exceptions/NotImplementedException';

export const router = express.Router();

// TODO add authentication to this route
router.get('/users', () => {
    throw new NotImplementedException('GET /users');
});
router.post('/users', controller.postUser);

export default router;
