import { Request, Response, NextFunction } from 'express';
import type * as s from 'zapatos/schema';
import NotImplementedException from '../exceptions/NotImplementedException';
import controller from './controller';

type Params = {
    reviewer?: string; // TODO UUID?
    reviewee?: string; // TODO UUID?
    state?: s.resume_review_state;
};

type ReqBody = {
    test: number;
    hello: boolean;
};

type ResBody = {
    resumeReviews: s.resume_reviews.Selectable[];
};

/**
 * Get all resume reviews.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns HTTP response.
 */
const getResumeReviews = controller(async (req: Request<Params, ResBody, ReqBody>, res: Response<ResBody>, next: NextFunction): Promise<void> => {
    throw new NotImplementedException('getResumeReviews');
    // TODO validate Params

    // TODO use repository to fetch get all resume reviews

    // TODO return all resume reviews
    req.log.debug('about to error');
    throw new Error('My custom error');

    res.status(200).json({ resumeReviews: [] });
});

type Params2 = Record<string, unknown>;

type ReqBody2 = s.resume_reviews.Insertable;

type ResBody2 = s.resume_reviews.Selectable;

const postResumeReview = controller(async (req: Request<Params2, ResBody2, ReqBody2>, res: Response<ResBody2>): Promise<void> => {
    throw new NotImplementedException('postResumeReview');

    // TODO validate ReqBody

    // TODO use repository to create a new resume review

    // TODO return new resume review

    const body = req.body;
    req.log.debug('%s', body.reviewee_id);
    res.status(201).json();
});

export { getResumeReviews, postResumeReview };

// TODO file for each individual controller?
