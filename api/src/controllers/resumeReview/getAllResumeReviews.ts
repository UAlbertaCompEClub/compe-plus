import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';

import * as resumeReviewRepository from '../../repositories/resumeReviewRepository';
import controller from '../controllerUtil';
import Validator, { beAResumeReviewState, beAValidUuid } from '../validation';

// TODO test id
type ReqQuery = {
    id?: string;
    reviewer?: string;
    reviewee?: string;
    state?: s.resume_review_state;
};

class ReqQueryValidator extends Validator<ReqQuery> {
    constructor() {
        super('query parameters');

        this.ruleFor('id')
            .mustAsync(beAValidUuid)
            .when((reqQuery) => reqQuery.id !== undefined);

        this.ruleFor('reviewer')
            .mustAsync(beAValidUuid)
            .when((reqQuery) => reqQuery.reviewer !== undefined);

        this.ruleFor('reviewee')
            .mustAsync(beAValidUuid)
            .when((reqQuery) => reqQuery.reviewee !== undefined);

        this.ruleFor('state')
            .mustAsync(beAResumeReviewState)
            .when((reqQuery) => reqQuery.state !== undefined);
    }
}

type ResBody = {
    resumeReviews: s.resume_reviews.JSONSelectable[];
};

/**
 * Get all resume reviews.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns HTTP response.
 */
const getAllResumeReviews = controller(async (req: Request<unknown, ResBody, unknown, ReqQuery>, res: Response<ResBody>): Promise<void> => {
    await new ReqQueryValidator().validateAndThrow(req.query);

    const allResumeReviews = await resumeReviewRepository.get(req.query.id, req.query.reviewee, req.query.reviewer, req.query.state);

    res.status(200).json({ resumeReviews: allResumeReviews });
});

export default getAllResumeReviews;
