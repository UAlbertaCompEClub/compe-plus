import { Request, Response } from 'express';
import { CamelCasedProperties } from 'type-fest';
import type * as s from 'zapatos/schema';

import * as resumeReviewRepository from '../../repositories/resumeReviewRepository';
import * as userRepository from '../../repositories/userRepository';
import { decodeQueryToUser, manyToCamelCase } from '../../util/helper';
import controller from '../controllerUtil';
import Validator, { beAResumeReviewState, beAValidUuid, beProperlyUriEncoded } from '../validation';

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

type ResumeReviewWithName = CamelCasedProperties<s.resume_reviews.JSONSelectable> & { revieweeName: string };

type ResBody = {
    resumeReviews: ResumeReviewWithName[];
};

/**
 * Get all resume reviews.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns All resume reviews.
 */
const getAllResumeReviews = controller(async (req: Request<unknown, ResBody, unknown, ReqQuery>, res: Response<ResBody>): Promise<void> => {
    await new ReqQueryValidator().validateAndThrow(req.query);

    const id = req.query.id;
    const reviewee = decodeQueryToUser(req.query.reviewee);
    const reviewer = decodeQueryToUser(req.query.reviewer);

    const allResumeReviews = await resumeReviewRepository.get(id, reviewee, reviewer, req.query.state);

    const camelCasedResumeReviews = manyToCamelCase(allResumeReviews);
    const resumeReviewsWithNames: ResumeReviewWithName[] = [];

    // TODO this is terrible. Rather than making an extra call for each resume I should just do a join in the DB.
    // Unfortunately, I'm too dumb to figure out how to get the join to work. :(
    for (const r of camelCasedResumeReviews) {
        const user = await userRepository.get(r.revieweeId);
        resumeReviewsWithNames.push({ ...r, revieweeName: user[0].full_name });
    }

    res.status(200).json({ resumeReviews: resumeReviewsWithNames });
});

export default getAllResumeReviews;
