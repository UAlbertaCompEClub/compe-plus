import express from 'express';

import middleware from '../controllers/middleware';
import * as controller from '../controllers/resumeReview/index';
import Scope from '../util/scopes';

export const router = express.Router();

router.get('/resume-reviews', middleware.authorizeAndFallThrough(Scope.ReadMyResumeReviews), controller.getMyResumeReviews);
router.get('/resume-reviews', middleware.authorize(Scope.ReadAllResumeReviews), controller.getAllResumeReviews);
router.post('/resume-reviews', middleware.authorize(Scope.CreateResumeReviews), controller.postResumeReview);

export default router;
