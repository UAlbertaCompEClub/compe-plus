import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';

import * as resumeReviewRepository from '../../repositories/resumeReviewRepository';
import { decodeQueryToUser } from '../../util/helper';
import controller from '../controllerUtil';
import Validator, { beAResumeReviewState, beProperlyUriEncoded } from '../validation';

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
            .mustAsync(beProperlyUriEncoded)
            .when((reqQuery) => reqQuery.id !== undefined);

        this.ruleFor('reviewer')
            .mustAsync(beProperlyUriEncoded)
            .when((reqQuery) => reqQuery.reviewer !== undefined);

        this.ruleFor('reviewee')
            .mustAsync(beProperlyUriEncoded)
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
 * @returns All resume reviews.
 */
const getAllResumeReviews = controller(async (req: Request<unknown, ResBody, unknown, ReqQuery>, res: Response<ResBody>): Promise<void> => {
    await new ReqQueryValidator().validateAndThrow(req.query);

    const id = decodeQueryToUser(req.query.id);
    const reviewee = decodeQueryToUser(req.query.reviewee);
    const reviewer = decodeQueryToUser(req.query.reviewer);

    const allResumeReviews = await resumeReviewRepository.get(id, reviewee, reviewer, req.query.state);

    res.status(200).json({ resumeReviews: allResumeReviews });
});

export default getAllResumeReviews;
