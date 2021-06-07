import express from 'express';
import * as controller from '../controllers/resumeReview/index';

export const router = express.Router();

router.get('/resume-reviews', controller.getResumeReviews);
router.post('/resume-reviews', controller.postResumeReview);

export default router;
