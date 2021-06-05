import express from 'express';
import controller from '../controllers/resumeReview';

export const router = express.Router();

router.get('/resume-reviews', controller.getResumeReviews);

export default router;
