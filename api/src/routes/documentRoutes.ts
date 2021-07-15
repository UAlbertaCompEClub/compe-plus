import express from 'express';

import * as controller from '../controllers/document/index';
import middleware from '../controllers/middleware';
import Scope from '../types/scopes';

export const router = express.Router();

router.post('/resume-reviews/:resumeReview/documents', middleware.authorize(Scope.CreateDocuments), controller.postDocument);

export default router;
