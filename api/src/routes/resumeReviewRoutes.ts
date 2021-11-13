import express from 'express';

import middleware from '../controllers/middleware';
import * as controller from '../controllers/resumeReview/index';
import Scope from '../types/scopes';

export const router = express.Router();

router.get('/resume-reviews', middleware.authorizeAndFallThrough(Scope.ReadAllResumeReviews), controller.getAllResumeReviews);
router.get('/resume-reviews', middleware.authorize(Scope.ReadMyResumeReviews), controller.getMyResumeReviews);

router.post('/resume-reviews', middleware.authorize(Scope.CreateResumeReviews), middleware.checkTOSAgreement(), controller.postResumeReview);

router.patch('/resume-reviews/:resumeReview', middleware.authorizeAndFallThrough(Scope.UpdateAllResumeReviews), controller.patchAllResumeReview);
router.patch('/resume-reviews/:resumeReview', middleware.authorize(Scope.UpdateMyResumeReviews), controller.patchMyResumeReview);

export default router;
