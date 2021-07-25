import express from 'express';

import middleware from '../controllers/middleware';
import * as controller from '../controllers/resumeReview/index';
import NotImplementedException from '../exceptions/NotImplementedException';
import Scope from '../types/scopes';

export const router = express.Router();

router.get('/resume-reviews', middleware.authorizeAndFallThrough(Scope.ReadAllResumeReviews), controller.getAllResumeReviews);
router.get('/resume-reviews', middleware.authorize(Scope.ReadMyResumeReviews), controller.getMyResumeReviews);

router.post('/resume-reviews', middleware.authorize(Scope.CreateResumeReviews), controller.postResumeReview);

router.patch('/resume-reviews/:resumeReview', middleware.authorizeAndFallThrough(Scope.UpdateAllResumeReviews), () => {
    throw new NotImplementedException('PATCH /resume-reviews/:resumeReview');
});
router.patch('/resume-reviews/:resumeReview', middleware.authorize(Scope.UpdateMyResumeReviews), () => {
    throw new NotImplementedException('PATCH /resume-reviews/:resumeReview');
});

export default router;
