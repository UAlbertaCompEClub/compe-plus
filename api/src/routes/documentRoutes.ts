import express from 'express';

import * as controller from '../controllers/document/index';
import middleware from '../controllers/middleware';
import NotImplementedException from '../exceptions/NotImplementedException';
import Scope from '../types/scopes';

export const router = express.Router();

router.get('/resume-reviews/:resumeReview/documents', middleware.authorizeAndFallThrough(Scope.ReadAllDocuments), () => {
    throw new NotImplementedException('GET /resume-reviews/:resumeReview/documents');
});
router.get('/resume-reviews/:resumeReview/documents', middleware.authorize(Scope.ReadMyDocuments), () => {
    throw new NotImplementedException('GET /resume-reviews/:resumeReview/documents');
});

router.post('/resume-reviews/:resumeReview/documents', middleware.authorize(Scope.CreateDocuments), controller.postDocument);

router.patch('/resume-reviews/:resumeReview/documents/:document', middleware.authorizeAndFallThrough(Scope.UpdateAllDocuments), () => {
    throw new NotImplementedException('PATCH /resume-reviews/:resumeReview/documents/:document');
});
router.patch('/resume-reviews/:resumeReview/documents/:document', middleware.authorize(Scope.UpdateMyDocuments), () => {
    throw new NotImplementedException('PATCH /resume-reviews/:resumeReview/documents/:document');
});

export default router;
