import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';
import NotImplementedException from '../../exceptions/NotImplementedException';
import controller from '../controllerUtil';
import Validator, { beAValidUuid, beAResumeReviewState } from '../validation';

type ReqQuery = {
    reviewer?: string; // TODO UUID?
    reviewee?: string; // TODO UUID?
    state?: s.resume_review_state;
};

class ReqQueryValidator extends Validator<ReqQuery> {
    constructor() {
        super('query parameters');

        this.ruleFor('reviewer')
            .must(beAValidUuid)
            .when((reqQuery) => reqQuery.reviewer !== undefined);

        this.ruleFor('reviewee')
            .must(beAValidUuid)
            .when((reqQuery) => reqQuery.reviewee !== undefined);

        this.ruleFor('state')
            .must(beAResumeReviewState)
            .when((reqQuery) => reqQuery.state !== undefined);
    }
}

type ResBody = {
    resumeReviews: s.resume_reviews.Selectable[];
};

/**
 * Get all resume reviews.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns HTTP response.
 */
const getResumeReviews = controller(async (req: Request<unknown, ResBody, unknown, ReqQuery>, res: Response<ResBody>): Promise<void> => {
    // Validate query parameters
    new ReqQueryValidator().validateAndThrow(req.query);

    throw new NotImplementedException('getResumeReviews');
    // TODO validate query

    // TODO use repository to fetch get all resume reviews

    // TODO return all resume reviews
    req.log.debug('about to error');
    throw new Error('My custom error');

    res.status(200).json({ resumeReviews: [] });
});

export default getResumeReviews;
