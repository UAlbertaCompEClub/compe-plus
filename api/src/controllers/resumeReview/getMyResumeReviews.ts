import { Request, Response } from 'express';
import { CamelCasedProperties } from 'type-fest';
import type * as s from 'zapatos/schema';

import * as resumeReviewRepository from '../../repositories/resumeReviewRepository';
import { decodeQueryToUser, manyToCamelCase } from '../../util/helper';
import controller from '../controllerUtil';
import Validator, { beAResumeReviewState, beAValidUuid, beProperlyUriEncoded } from '../validation';

type ReqQuery = {
    id?: string;
    reviewer?: string;
    state?: s.resume_review_state;
};

class ReqQueryValidator extends Validator<ReqQuery> {
    constructor() {
        super('query parameters');

        this.ruleFor('id')
            .mustAsync(beAValidUuid)
            .when((reqQuery) => reqQuery.id !== undefined);

        this.ruleFor('reviewer')
            .mustAsync(beProperlyUriEncoded)
            .when((reqQuery) => reqQuery.reviewer !== undefined);

        this.ruleFor('state')
            .mustAsync(beAResumeReviewState)
            .when((reqQuery) => reqQuery.state !== undefined);
    }
}

type ResumeReviewWithDetails = CamelCasedProperties<s.resume_reviews.JSONSelectable & { reviewer: s.users.JSONSelectable; reviewee: s.users.JSONSelectable }>;

type ResBody = {
    resumeReviews: ResumeReviewWithDetails[];
};

/**
 * Get my resume reviews.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns Your resume reviews.
 */
const getMyResumeReviews = controller(async (req: Request<unknown, ResBody, unknown, ReqQuery>, res: Response<ResBody>): Promise<void> => {
    await new ReqQueryValidator().validateAndThrow(req.query);

    const id = req.query.id;
    const reviewer = decodeQueryToUser(req.query.reviewer);

    // Reviewee must be same as requesting user
    const reviewee = req.user.sub;

    const allResumeReviews = await resumeReviewRepository.getWithUserDetails(id, reviewee, reviewer, req.query.state);

    res.status(200).json({ resumeReviews: manyToCamelCase(allResumeReviews) });
});

export default getMyResumeReviews;
