import express from 'express';

import * as controller from '../controllers/document/index';
import middleware from '../controllers/middleware';
import Scope from '../types/scopes';

export const router = express.Router();

router.get('/resume-reviews/:resumeReview/documents', middleware.authorizeAndFallThrough(Scope.ReadAllDocuments), controller.getAllDocuments);
router.get('/resume-reviews/:resumeReview/documents', middleware.authorize(Scope.ReadMyDocuments), controller.getMyDocuments);

router.post('/resume-reviews/:resumeReview/documents', middleware.authorize(Scope.CreateDocuments), middleware.checkTOSAgreement(), controller.postDocument);

router.patch('/resume-reviews/:resumeReview/documents/:document', middleware.authorizeAndFallThrough(Scope.UpdateAllDocuments), middleware.checkTOSAgreement(), controller.patchAllDocument);
router.patch('/resume-reviews/:resumeReview/documents/:document', middleware.authorize(Scope.UpdateMyDocuments), middleware.checkTOSAgreement(), controller.patchMyDocument);

export default router;
